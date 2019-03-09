<template>
  <div id="root">
    <div class="header flex-wrapper">
      <h5>Robin Admin</h5>
    </div>
    <div class="main">
      <div class="left">
        <ul>
          <li>
            <router-link to="article-manager">Add article</router-link>
          </li>
        </ul>
      </div>
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
      margin-top: 10px;
      width: 200px;
      background-color: #fff;
      color: white;
      height: 100%;
      ul {
        margin-top: 10px;
        li {
          font-size: 14px;
          text-align: center;
          a {
            text-decoration: none;
          }
        }
      }
    }
    .right {
      width: 100%;
      margin: 10px;
      .content {
      }
    }
  }
}
</style>






