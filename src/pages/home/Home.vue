<!-- 主页 -->
<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <div class="header-logo">{{ this.logoName }}</div>
        <Menu :active-name="activeRouter" theme="dark" width="auto" :class="menuitemClasses" class="sidebar-left-menu">
          <MenuItem :name="menuItem.name" :to="menuItem.path" v-for="menuItem of menuList" :key="menuItem.name">
            <Icon :custom="menuItem.icon" />
            <span>{{ menuItem.title }}</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <home-header :isCollapsed="isCollapsed" @collapsedSider="collapsedSider" />
        <Content class="home-content">
          <div class="content-header">
            <Tag type="dot"
                 :name="tag.name"
                 :closable="isClosable(tag.name)"
                 :color="isChecked(tag.name)"
                 checkable
                 @on-close="remove"
                 :checked="tag.name === checkName"
                 v-for="tag of routerMap"
                 @click.native="tagChange(tag.path)"
                 :key="tag.name">{{ tag.title }}</Tag>
          </div>
          <div class="router-container">
            <router-view />
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import HomeHeader from './components/Header'
export default {
  name: 'home',
  data () {
    return {
      isCollapsed: false,
      menuList: [{
        name: 'home-index',
        path: '/',
        title: '主页',
        icon: 'i-icon icon-home'
      }, {
        name: 'user-manage',
        path: 'user',
        title: '用户管理',
        icon: 'i-icon icon-team'
      }, {
        name: 'admin-manage',
        path: 'admin',
        title: '管理员',
        icon: 'i-icon icon-user'
      }, {
        name: 'unlock',
        path: 'unlock',
        title: '开锁记录',
        icon: 'i-icon icon-unlock'
      }, {
        name: 'analysis',
        path: 'analysis',
        title: '数据分析',
        icon: 'i-icon icon-linechart'
      }],
      checkName: 'user-manage',
      delFlag: false
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    },
    // 标签移除
    remove (event,name) {
      let index = -1
      for(let i in this.routerMap){
        if(this.routerMap[i].name === name){
          index = i
        }
      }
      // 即将要移除的是当前页
      if (name === this.$route.name) {
        this.$router.push(this.routerMap[index - 1].path)
      }
      this.delFlag = true
      this.routerMap.splice(index, 1)
      this.delFlag = false
      let mapItem = {}
      mapItem.delFlag = true
      mapItem.router = {}
      this.setRouterMap(mapItem)
    },
    isChecked (tagName) {
      return tagName === this.$route.name ? 'primary' : ''
    },
    // 标签是否可关闭
    isClosable (tagName) {
      return tagName !== 'home-index'
    },
    // 标签页切换
    tagChange (path) {
      this.$router.push(path)
    },
    // vuex拓展方法
    ...mapMutations(
      ['setRouterMap']
    )
  },
  components: {
    HomeHeader
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    activeRouter () {
      return this.$route.name
    },
    ...mapState(['routerMap'])
  },
  watch: {
    '$route': {
      deep: true,
      handler(to, from) {
        if (this.delFlag) return
        let router = {}
        router.path = to.fullPath
        router.name = to.name
        router.title = to.meta.title
        let routerMap = this.routerMap
        let flag = true
        for(let i=0;i<routerMap.length;i++){
          if(routerMap[i].name === router.name){
            flag = false
          }
        }
        if(flag){
          let mapItem = {}
          mapItem.delFlag = false
          mapItem.router = router
          this.setRouterMap(mapItem)
        }
      }
    },
    isCollapsed (val) {
      this.$store.commit('siderChange', val)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@style/mixins';
  @import '~@style/style';
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .ivu-layout{
    height:100%;
  }
  .ivu-layout-sider{
    background: #001529;
  }
  .header-logo{
    width: 100%;
    height: 64px;
    background: #002140;
    line-height: 64px;
    text-align: center;
    font-size: 1.25rem;
    font-weight:bold;
    color: #FFF;
    letter-spacing: 1.5px;
    text-shadow: 0 0 20px #FFF;
    animation: logoTwinkle 1.5s alternate infinite;
  }
  @keyframes logoTwinkle {
    0%{
      text-shadow: 0 0 10px #FFF;
    }50%{
      text-shadow: 0 0 20px #FFF;
    }100%{
      text-shadow: 0 0 0 #FFF;
    }
  }
  .ivu-menu-dark{
    background: transparent;
  }
  .sidebar-left-menu{
    .ivu-menu-item{
      color: #FFF !important;
    }
  }
  .ivu-layout-sider-collapsed{
    .ivu-menu-item{
      height: 50px;
      line-height: 1;
      text-align: center;
      overflow: hidden;
    }
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
  .icon-home{
    text-align: center;
    font-size: .4rem;
  }
  @font-face {
    font-family: "custom-font";
    .icon-font();
  }
  .home-content{
    padding: 5px 10px;
    height: calc(~'100% - 64px');
    box-sizing: border-box;
    .content-header{
      margin-bottom:2px;
    }
    .router-container{
      background: #FFF;
      height: calc(~'100% - 42px');
      padding: 15px;
      box-sizing: border-box;
      &>div{
        height: 100%;
        position: relative;
      }
    }
  }
  .ivu-tag{
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }
</style>
