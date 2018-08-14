<!-- 内容区域 -->
<template>
  <div class="content-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'content-container'
}
</script>

<style lang="less" scoped>
  .content-container{
    position: absolute;
    top: 54px;
    left: 0;
    bottom: 86px;
    overflow: auto;
    width: 100%;
  }
</style>
