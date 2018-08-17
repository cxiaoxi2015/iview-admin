<!-- 用户新增或者修改 根据isEdit做判断 -->
<template>
  <div class="UserEdit">
    <my-modal :title="userModalTips"
              :modalShow="showUserInfo"
              @modalRemove="modalRemove"
              @cancel="modalCancel"
              @confirm="modalConfirm">
      <Button shape="circle" type="primary" :icon="editIcon" class="float-right not-allow" @click="userEdit" size="small" v-if="isEdit"></Button>
      <Form ref="userInfo" :model="userForm" :rules="userInfoRules" label-position="top" v-if="showForm">
        <FormItem label="账号:" prop="USER_NAME">
          <Input v-model="userForm.USER_NAME" :clearable="!isEdit" :disabled="isEdit" />
        </FormItem>
        <FormItem label="地址:" prop="USER_ADDRESS">
          <Input v-model="userForm.USER_ADDRESS" clearable :maxlength="30" />
        </FormItem>
        <FormItem label="注册时间:" prop="USER_REGISTER_DATE" v-if="isEdit">
          <Input v-model="userForm.USER_REGISTER_DATE" disabled />
        </FormItem>
      </Form>
      <div class="modal-info-content" v-else>
        <p> 账号: {{ userInfo.USER_NAME }} </p>
        <p> 地址: {{ userInfo.USER_ADDRESS }} </p>
        <p> 注册时间: {{ userInfo.USER_REGISTER_DATE }} </p>
      </div>
    </my-modal>
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  data () {
    return {
      showUserInfo: false,
      canEdit: false,
      showForm: false,
      userForm: {},
      loading: false,
      userId: '', // 当前用户
      // 表单验证
      userInfoRules: {
        USER_NAME: [
          { required: true, validator: this.$verify.checkUsername('账号不能为空','账号只能由3-15位的数字、字母组成') , trigger: 'blur' }
        ],
        USER_ADDRESS: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        USER_REGISTER_DATE: [
          { required: true, message: '注册时间不能为空', trigger: 'blur' }
        ]
      },
      userModalTips: '用户信息'
    }
  },
  methods: {
    // 开启编辑模式
    userEdit () {
      !this.canEdit ? this.canEdit = true : this.userSave()
    },
    // 弹窗取消
    modalCancel () {
      this.showUserInfo = false
      this.canEdit ? this.canEdit = false : this.canEdit
    },
    // 弹窗确定
    modalConfirm () {
      // 如果是编辑模式 就是有form的情况下
      if (this.showForm) {
        this.$refs.userInfo.validate((valid) => {
          if (valid) {
            this.$http.post(this.isEdit ? 'user/updateUser' : 'user/userAdd',{
              username: this.userForm.USER_NAME,
              address: this.userForm.USER_ADDRESS,
              userId: this.userId
            },{
              _this: this,
              loading: ''
            },res => {
              this.$emit('reloadData')
              this.showUserInfo = false
              this.canEdit = false
            },err => {})
          } else {

          }
        })
      } else {
        this.showUserInfo = false
      }
    },
    // 修改或新增保存
    userSave () {
      this.canEdit = false
    },
    // 弹窗关闭
    modalRemove () {
      this.showForm ? this.$refs.userInfo.resetFields() : ''
      this.$emit('editClose')
    }
  },
  props: {
    // 是否为编辑状态(true为编辑 false为新增)
    isEdit: {
      type: Boolean,
      default: true
    },
    modalShow: Boolean,
    userInfo: Object
  },
  computed: {
    editIcon () {
      return this.canEdit ? 'ios-create-outline': 'md-lock'
    }
  },
  watch: {
    modalShow (val) {
      this.showUserInfo = val
      if (val) {
        if (this.isEdit) {
          this.userModalTips = '用户信息'
          this.showForm = false
          this.userForm = this.userInfo
          this.userId = this.userInfo.USER_ID
        } else {
          this.userModalTips = '新增用户'
          this.showForm = true
          this.userId = ''
          this.userForm = {
            USER_NAME: '',
            USER_ADDRESS: '',
            USER_REGISTER_DATE: '',
            TOTAL_DEVICE: ''
          }
        }
      }
    },
    canEdit (val) {
      this.showForm = val
    },
    loading (val) {
      if (val) {
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'ios-loading',
                  size: 18
                }
              }),
              h('div', '正在保存')
            ])
          }
        })
      } else {
        this.$Spin.hide()
      }
    }
  }
}
</script>

<style lang="less">

</style>
