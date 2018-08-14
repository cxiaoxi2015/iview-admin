<!-- 用户管理 -->
<template>
  <div class="user">
    <content-header>
      <div slot="contentHeaderLeft">
        <Col span="4">
          <Input v-model="account" placeholder="按账号查找..." clearable />
        </Col>
        <Col span="5">
          <Row :gutter="5">
            <Col span="20">
              <datePicker :value="registerTime" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="按注册时间查找..."></datePicker>
            </Col>
            <Col span="4">
              <Button type="primary" icon="ios-search" :loading="isSearching" @click="search"></Button>
            </Col>
          </Row>
        </Col>
      </div>
      <div slot="contentHeaderRight">
        <Button type="primary" @click="userAdd">新增</Button>
        <Button type="warning">重置</Button>
      </div>
    </content-header>
    <content-container>
      <Table border ref="selection" :columns="columns" :data="data"></Table>
      <UserEdit :modalShow="showUserInfo"
                :userInfo="userInfo"
                :isEdit="isEdit"
                @editClose="editCancel"
      ></UserEdit>
    </content-container>
    <content-footer :total="total"></content-footer>
  </div>
</template>

<script>
import UserEdit from './components/UserEdit'
export default {
  name: 'User',
  data () {
    return {
      account: '', // 账号,
      registerTime: '', // 注册时间
      isSearching: false, // 查找中
      total: 40,
      pdevNums: '',
      rows: '',
      showUserInfo: false, // 是否显示用户信息弹窗(新增或编辑)
      modal2: true,
      modal_loading: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '账号',
          key: 'userName'
        },
        {
          title: '设备数量',
          key: 'devNums'
        },
        {
          title: '注册时间',
          key: 'register'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.userEdit(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteUser(params.index)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data: [
        {
          userName: 'John Brown',
          devNums: 18,
          address: 'New York No. 1 Lake Park',
          register: '2016-10-03'
        },
        {
          userName: 'Jim Green',
          devNums: 24,
          address: 'London No. 1 Lake Park',
          register: '2016-10-01'
        },
        {
          userName: 'Joe Black',
          devNums: 30,
          address: 'Sydney No. 1 Lake Park',
          register: '2016-10-02'
        },
        {
          userName: 'Jon Snow',
          devNums: 26,
          address: 'Ottawa No. 2 Lake Park',
          register: '2016-10-04'
        },
        {
          userName: 'John Brown',
          devNums: 18,
          address: 'New York No. 1 Lake Park',
          register: '2016-10-03'
        },
        {
          userName: 'Jim Green',
          devNums: 24,
          address: 'London No. 1 Lake Park',
          register: '2016-10-01'
        },
        {
          userName: 'Joe Black',
          devNums: 30,
          address: 'Sydney No. 1 Lake Park',
          register: '2016-10-02'
        },
        {
          userName: 'Jon Snow',
          devNums: 26,
          address: 'Ottawa No. 2 Lake Park',
          register: '2016-10-04'
        },
        {
          userName: 'John Brown',
          devNums: 18,
          address: 'New York No. 1 Lake Park',
          register: '2016-10-03'
        },
        {
          userName: 'Jim Green',
          devNums: 24,
          address: 'London No. 1 Lake Park',
          register: '2016-10-01'
        },
        {
          userName: 'Joe Black',
          devNums: 30,
          address: 'Sydney No. 1 Lake Park',
          register: '2016-10-02'
        },
        {
          userName: 'Jon Snow',
          devNums: 26,
          address: 'Ottawa No. 2 Lake Park',
          register: '2016-10-04'
        },
        {
          userName: 'John Brown',
          devNums: 18,
          address: 'New York No. 1 Lake Park',
          register: '2016-10-03'
        },
        {
          userName: 'Jim Green',
          devNums: 24,
          address: 'London No. 1 Lake Park',
          register: '2016-10-01'
        },
        {
          userName: 'Joe Black',
          devNums: 30,
          address: 'Sydney No. 1 Lake Park',
          register: '2016-10-02'
        },
        {
          userName: 'Jon Snow',
          devNums: 26,
          address: 'Ottawa No. 2 Lake Park',
          register: '2016-10-04'
        }
      ],
      // 当前用户
      userId: null,
      userInfo: {},
      isEdit: true
    }
  },
  methods: {
    search () {
      this.isSearching = true
    },
    // 用户新增
    userAdd () {
      this.isEdit = false
      this.showUserInfo = true
    },
    // 查看用户详细信息
    userEdit (user) {
      this.userInfo = JSON.parse(JSON.stringify(user))
      this.showUserInfo = true
    },
    /**
     * @description: 删除用户(confirm方法可选参数)
     * @param: { loading: 点击按钮后的loading(true,false) title: '删除标题' tips: '删除提示' confirm: '执行删除的方法' cancel: '取消的方法'  }
     * @author: xx
     * @date: 2018-08-10 09:51:55
     */
    deleteUser (index) {
      this.$confirm({
        title: '删除确认',
        tips: '您是否要继续删除？',
        loading: this.modal_loading,
        confirm: ()=>{  this.deleteConfirm(index) }
      })
    },
    // 确认删除
    deleteConfirm (index) {
      this.data.splice(index,1)
      this.$Modal.remove()
      this.$Message.success('删除成功')
    },
    // 弹窗关闭
    editCancel () {
      this.showUserInfo = false
      this.isEdit = true
    }
  },
  components: {
    UserEdit
  }
}
</script>

<style lang="less">
  @import '~@style/style';
  .not-allow{
    margin-top: -20px;
  }
  .modal-info-content{
    font-size: 14px;
  }
</style>
