<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {

  }
}
</script>

<style lang="less">
  #app{
    height:100%;
    &>div{
      height:100%;
    }
  }
</style>
