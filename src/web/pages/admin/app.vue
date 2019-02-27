<template>
  <div id="root">
    <div class="header">
      <h5>后台管理系统</h5>
    </div>
    <div class="main">
      <div class="left">left</div>
      <div class="right">
        <div class="content">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
<style lang="scss">
html {
  height: 100%;
}
body {
  height: 100%;
  background-color: #f1f1f1;
}
#root {
  height: 100%;
  .header {
    background-color: #fff;
    height: 40px;
    line-height: 40px;
  }
  .main {
    height: 100%;
    display: flex;
    .left {
      width: 200px;
      background-color: #202638;
      color: white;
      height: 100%;
    }
    .right {
      .content {
        background-color: #fff;
      }
    }
  }
}
</style>






