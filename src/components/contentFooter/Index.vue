<!-- 内容尾 -->
<template>
  <div class="content-footer">
    <Divider />
    <div class="content-footer-slot">
      <slot>
        <Page :total="total" show-elevator show-sizer />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'content-footer',
  props: {
    total: {
      type: Number
    }
  }
}
</script>

<style lang="less" scoped>
  .content-footer {
    width: 100%;
    height: 86px;
    position: absolute;
    bottom: 0;
    left: 0;
    .ivu-divider-horizontal {
      margin: 15px 0;
    }
    .content-footer-slot {
      width: 100%;
      height: 56px;
      line-height: 56px;
      padding: 0 15px;
      box-sizing: border-box;
    }
  }
</style>
