<!-- 管理员 -->
<template>
  <div class="admin">
    <content-header>
      <div slot="contentHeaderLeft">
        <Col span="4">
          <Input v-model="account" placeholder="按账号查找" clearable />
        </Col>
        <Col span="5">
          <Row :gutter="5">
            <Col span="20">
              <datePicker :value="registerTime" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="按创建时间查找..."></datePicker>
            </Col>
            <Col span="4">
              <Button type="primary" icon="ios-search" :loading="isSearching" @click="search"></Button>
            </Col>
          </Row>
        </Col>
      </div>
      <div slot="contentHeaderRight">
        <Button type="primary">新增</Button>
        <Button type="warning">重置</Button>
      </div>
    </content-header>
    <content-container>
      <Table border ref="selection" :columns="columns" :data="data"></Table>
      <my-modal title="管理员信息"
                :modalShow="showUserInfo"
                @cancel="modalCancel"
                @confirm="modalConfirm">
        <Button shape="circle" type="primary" :icon="editIcon" class="float-right not-allow" @click="userEdit" size="small"></Button>
        <Form ref="userInfo" :model="userInfo" :rules="userInfoRules" label-position="top" v-if="canEdit">
          <FormItem label="账号" prop="userName">
            <Input v-model="userInfo.userName" clearable />
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="userInfo.address" clearable />
          </FormItem>
          <FormItem label="注册时间" prop="register">
            <Input v-model="userInfo.register" clearable />
          </FormItem>
        </Form>
        <div class="modal-info-content" v-else>
          <p> 账号: {{ userInfo.userName }} </p>
          <p> 地址: {{ userInfo.address }} </p>
          <p> 注册时间: {{ userInfo.register }} </p>
        </div>
      </my-modal>
    </content-container>
    <content-footer :total="total"></content-footer>
  </div>
</template>

<script>
  export default {
    name: 'Admin',
    data () {
      return {
        account: '', // 账号,
        registerTime: '', // 注册时间
        isSearching: false, // 查找中
        total: 40,
        pdevNums: '',
        rows: '',
        showUserInfo: false,
        canEdit: false, // 是否可编辑
        modal2: true,
        modal_loading: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '管理员账号',
            key: 'userName'
          },
          {
            title: '创建时间',
            key: 'register'
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
                      this.detailUser(params.row)
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
            register: '2016-10-03'
          },
          {
            userName: 'Jim Green',
            register: '2016-10-01'
          },
          {
            userName: 'Joe Black',
            register: '2016-10-02'
          },
          {
            userName: 'Jon Snow',
            register: '2016-10-04'
          },
          {
            userName: 'John Brown',
            register: '2016-10-03'
          },
          {
            userName: 'Jim Green',
            register: '2016-10-01'
          },
          {
            userName: 'Joe Black',
            register: '2016-10-02'
          },
          {
            userName: 'Jon Snow',
            register: '2016-10-04'
          },
          {
            userName: 'John Brown',
            register: '2016-10-03'
          },
          {
            userName: 'Jim Green',
            register: '2016-10-01'
          },
          {
            userName: 'Joe Black',
            register: '2016-10-02'
          },
          {
            userName: 'Jon Snow',
            register: '2016-10-04'
          },
          {
            userName: 'John Brown',
            register: '2016-10-03'
          },
          {
            userName: 'Jim Green',
            register: '2016-10-01'
          },
          {
            userName: 'Joe Black',
            register: '2016-10-02'
          },
          {
            userName: 'Jon Snow',
            register: '2016-10-04'
          }
        ],
        // 当前用户
        userId: null,
        userInfo: {},
        // 表单验证
        userInfoRules: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          register: [
            { required: true, message: '注册时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      search () {
        this.isSearching = true
      },
      // 查看用户详细信息
      detailUser (user) {
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
          confirm: this.deleteConfirm(index)
        })
      },
      // 确认删除
      deleteConfirm (index) {
        this.data.splice(index,1)
      },
      modalCancel () {
        this.showUserInfo = false
        this.canEdit ? this.canEdit = false : this.canEdit
      },
      modalConfirm () {
        this.showUserInfo = false
      },
      // 用户信息编辑
      userEdit () {
        !this.canEdit ? this.canEdit = true : this.userSave()
      },
      // 修改或新增保存
      userSave () {
        this.canEdit = false
      }
    },
    computed: {
      editIcon () {
        return this.canEdit ? 'ios-create-outline': 'md-lock'
      }
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
  .ivu-modal-confirm-footer{
    display: none;
  }
</style>
