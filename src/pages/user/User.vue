<!-- 用户管理 -->
<template>
  <div class="user">
    <content-header>
      <div slot="contentHeaderLeft">
        <Col span="4">
          <Input v-model="username" placeholder="按账号查找..." clearable />
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
      <Spin size="large" fix v-if="loading"></Spin>
      <Table border ref="selection" :columns="columns" :data="userList"></Table>
      <UserEdit :modalShow="showUserInfo"
                :userInfo="userInfo"
                :isEdit="isEdit"
                @reloadData="queryUserByPagination"
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
      username: '', // 账号,
      registerTime: '', // 注册时间
      isSearching: false, // 查找中
      total: 0,
      page: 1,
      rows: 10,
      showUserInfo: false, // 是否显示用户信息弹窗(新增或编辑)
      modal2: true,
      modal_loading: false,
      loading: false, // 数据加载中
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '账号',
          key: 'USER_NAME'
        },
        {
          title: '设备数量',
          key: 'TOTAL_DEVICE'
        },
        {
          title: '注册时间',
          key: 'USER_REGISTER_DATE',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.USER_REGISTER_DATE)
            ])
          }
        },
        {
          title: '地址',
          key: 'USER_ADDRESS'
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
                    this.deleteUser(params.row.USER_ID)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      userList: [],
      // 当前用户
      userId: null,
      userInfo: {},
      isEdit: true
    }
  },
  methods: {
    search () {
      this.isSearching = true
      this.queryUserByPagination()
    },
    // 获取用户列表
    queryUserByPagination () {
      this.$http.get('user/queryUserByPagination',{
        params: {
          page: this.page,
          rows: this.rows,
          username: this.username,
          registerTime: this.registerTime
        }
      }, {
        _this: this,
        loading: 'loading'
      }, res => {
        this.userList = res.data
        this.total = res.total
      }, err => {

      })
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
    deleteUser (userId) {
      this.$confirm({
        title: '删除确认',
        tips: '您是否要继续删除？',
        loading: this.modal_loading,
        confirm: ()=>{  this.deleteConfirm(userId) }
      })
    },
    // 确认删除
    deleteConfirm (userId) {
      this.$Modal.remove()
      this.$http.post('user/deleteUserById', {
        userId: userId
      },{
        _this: this,
        loading: 'loading'
      }, res => {
        this.queryUserByPagination()
      }, err => {

      })
    },
    // 弹窗关闭
    editCancel () {
      this.showUserInfo = false
      this.isEdit = true
    }
  },
  components: {
    UserEdit
  },
  mounted () {
    this.queryUserByPagination()
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
