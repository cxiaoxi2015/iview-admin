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
        <FormItem label="账号" prop="userName">
          <Input v-model="userForm.userName" clearable />
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input v-model="userForm.address" clearable :maxlength="30" />
        </FormItem>
        <FormItem label="注册时间" prop="register" v-if="isEdit">
          <Input v-model="userForm.register" clearable />
        </FormItem>
      </Form>
      <div class="modal-info-content" v-else>
        <p> 账号: {{ userInfo.userName }} </p>
        <p> 地址: {{ userInfo.address }} </p>
        <p> 注册时间: {{ userInfo.register }} </p>
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
      // 表单验证
      userInfoRules: {
        userName: [
          { required: true, validator: this.$verify.checkUsername('账号不能为空','账号只能由3-15位的数字、字母组成') , trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        register: [
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
      this.showUserInfo = false
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
        } else {
          this.userModalTips = '新增用户'
          this.showForm = true
          this.userForm = {
            userName: '',
            address: '',
            register: '',
            devNums: ''
          }
        }
      }
    },
    canEdit (val) {
      this.showForm = val
    }
  }
}
</script>

<style lang="less">

</style>
