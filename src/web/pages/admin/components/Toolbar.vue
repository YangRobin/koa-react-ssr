
<template>
  <div class="toolbar">

    <ul>
      <li>关闭</li>
      <li>工具</li>
      <li>工具</li>
      <li>工具</li>
      <li>工具</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Toolbar'
}
</script>

<style lang="scss" scoped>
.toolbar {
    position: fixed;
    bottom: 0;
    right: 40px;
    background-color: #18b9f3;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    height: 40px;
    line-height: 40px;
    color: white;
  ul {
    overflow: hidden;
    padding:0 10px;
    li {
      float: left;
      margin-right: 10px;
    }
  }
}
</style>
