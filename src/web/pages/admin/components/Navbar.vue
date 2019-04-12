<template>
  <div class="nav">
    <a href="#">ROBINDESIGN</a>
    <div class="bfc">
      <ul>
        <li>
          <a href="#">登出</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="less" scoped>
.nav {
  // position: fixed;
  // width: 100%;
  // top:0;
  color: #5c7ffc;
  height: 50px;
  line-height: 50px;
  background: #ffffff;
  box-shadow: 0 2px 0px 0 rgb(237, 237, 237);

  a {
    display: block;
    width: 200px;
    float: left;
    color: inherit;
    padding-left: 10px;
    box-sizing: border-box;
  }
  ul {
    float: right;
    text-align: right;
    padding-right: 20px;
    li {
      list-style: none;
    }
  }
}
</style>
