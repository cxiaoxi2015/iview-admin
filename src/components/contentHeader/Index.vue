<!-- 内容头 -->
<template>
  <div class="content-header">
    <Row :gutter="5">
      <Col span="16">
        <Row :gutter="5">
          <slot name="contentHeaderLeft"></slot>
        </Row>
      </Col>
      <Col span="8">
        <div class="content-header-right">
          <slot name="contentHeaderRight"></slot>
        </div>
      </Col>
    </Row>
    <Divider />
  </div>
</template>

<script>
export default {
  name: 'content-header'
}
</script>

<style lang="less" scoped>
  .content-header {
    width: 100%;
    height: 54px;
    position: absolute;
    top: 0;
    left: 0;
    .ivu-divider-horizontal{
      margin: 10px 0;
    }
    .content-header-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .ivu-btn {
        margin-right:5px;
      }
    }
  }
</style>
