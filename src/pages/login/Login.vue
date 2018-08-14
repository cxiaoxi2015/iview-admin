<!-- 登录 -->
<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="login-content">
      <Card :bordered="false">
        <p slot="title">登 录</p>
        <Form ref="loginForm" :model="loginForm" @keyup.native.enter="signin">
          <FormItem prop="user">
            <Input type="text" v-model="loginForm.username" placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="signin" long :loading="loading">{{ loginTips }}</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    signin () {
      this.loading = true
      if (this.loginForm.username === 'admin' && this.loginForm.password === '123456'){
        setTimeout(()=>{
          this.$router.push('/')
          this.loading = false
        },2000)
      } else if (this.loginForm.username === '' || this.loginForm.password === ''){
        setTimeout(()=>{
          this.loading = false
          this.$Message.warning('用户名密码均不能为空')
        },1000)
      } else {
        setTimeout(()=>{
          this.loading = false
          this.$Message.warning('用户名或密码错误')
        })
      }
    }
  },
  computed: {
    loginTips () {
      return this.loading ? '登录中...' : '登 录'
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-bg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #EEE;
    }
    .login-content{
      position: relative;
      top: -50px;
      opacity: 1;
      .ivu-card{
        width: 400px;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        border-color: #eee;
      }
    }
  }
</style>
