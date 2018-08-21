<template>
  <Header :style="{padding: 0}" class="layout-header-bar">
      <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
      <div class="layout-nav home-header-menu">
        <Dropdown class="header-user-dropdown" @on-click="open">
          <a href="javascript:void(0)">
            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" class="user-avatar" />
            {{ userName }}
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name=""><Icon type="ios-person-outline" size="18" class="header-right-dropdown-icon" />个人中心</DropdownItem>
            <DropdownItem name=""><Icon custom="i-icon icon-setting" size="18" class="header-right-dropdown-icon" />设置</DropdownItem>
            <DropdownItem name="login" divided><Icon type="md-log-out" size="18" class="header-right-dropdown-icon" />退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Header>
</template>

<script>
export default {
  name: 'home-header',
  data () {
    return {
      userName: '超级管理员'
    }
  },
  methods: {
    collapsedSider () {
      this.$emit('collapsedSider')
    },
    // 路由跳转
    open (routerName) {
      if (routerName === 'login') {
        this.$confirm({
          title: '登出',
          tips: '您确认要退出吗？',
          confirm: () => {
            this.$store.dispatch('logout').then(() => {
              this.$Modal.remove()
              this.$router.push(routerName)
            })
          }
        })
      }
    }
  },
  props: {
    isCollapsed: Boolean
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@style/mixins';
  @import '~@style/style';
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .rotateIcon{
    cursor: pointer;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .ivu-layout{
    height:100%;
  }
  .ivu-layout-sider{
    background: #001529;
  }
  .menu-icon{
    cursor: pointer;
  }
  .ivu-menu-dark{
    background: transparent;
  }
  .sidebar-left-menu{
    .ivu-menu-item{
      color: #FFF !important;
    }
  }
  .layout-nav{
    min-width: 500px;
    float: right;
    height: 100%;
    padding-right: 20px;
  }
  .home-header-menu{
    .ivu-dropdown {
      float: right;
      padding: 0 15px;
      cursor: pointer;
      height: 100%;
      &:hover{
        background: #E6F7FF;
      }
      a{
        color: #666;
        font-size: 12px;
        &:hover{
          color: #666;
        }
      }
      .ivu-dropdown-item{
        display: flex;
        align-items: center;
        &:hover{
          background: #E6F7FF;
        }
      }
    }
  }
  .user-avatar{
    margin-right: 5px;
  }
  .header-right-dropdown-icon{
    margin-right:5px;
  }
  .ivu-dropdown-item-divided:before{
    margin: 0;
  }
  .icon-home{
    text-align: center;
    font-size: .4rem;
  }
  @font-face {
    font-family: "custom-font";
    .icon-font();
  }
  .header-user-dropdown{
    .ivu-select-dropdown{
      border-radius: 0 !important;
    }
    .ivu-dropdown-menu{
      .ivu-dropdown-item{
        padding: 5px 30px;
      }
    }
  }
</style>
