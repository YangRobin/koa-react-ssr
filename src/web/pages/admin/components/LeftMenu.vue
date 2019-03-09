<template>
  <div class="left-menu">
    <div class="main-menu">
      <div class="avator">
        <img src="static/img/avator.jpg" alt>
      </div>
      <div class="pers_name">ROBIN
        <br>
        <b>创办于2018/12/25</b>
      </div>
      <ul class="links">
        <li v-bind:key="i.name" v-for="i in menu">
          <router-link :to="i.path">
            <i :class="i.icon"></i>
            {{i.name}}
          </router-link>
        </li>
      </ul>
    </div>
    <!-- <div class="sub-menu" v-show="subMenuVisible">
      <span @click="closeSub()"> <i class="icon-guanji iconfont"></i> </span>
      <ul>
        <li  class="active-path" v-for="i in subMenu">
          <router-link :to="i.path">{{i.name}}</router-link>
        </li>
      </ul>
    </div>-->
  </div>
</template>
<script>

import menu from '../menu'
export default {
  name: 'LeftMenu',
  data () {
    return {
      subMenuVisible: false,
      name: '',
      menu: {},
      subMenu: {}
    }
  },
  mounted () {
    this.menu = menu
  }
  // public toggle(name: string) {
  //   //判断点击的路由 是否是当前路由
  //   if (this.name === name) {
  //     this.subMenuVisible = !this.subMenuVisible;
  //     this.toggleSub(name);
  //     const currentMenu = menu.find(i => {
  //       return i.name === name;
  //     });
  //     this.subMenu = currentMenu ? currentMenu.children : {};
  //   } else {
  //     //
  //     const currentMenu = menu.find(i => {
  //       return i.name === name;
  //     });
  //     this.subMenu = currentMenu ? currentMenu.children : {};
  //     if (this.subMenuVisible) {
  //       this.name = name;
  //     } else {
  //       this.toggleSub(name);
  //       this.subMenuVisible = true;
  //     }
  //   }
  // }
  // public closeSub() {
  //   this.subMenuVisible = false;
  //   this.toggleSub(this.name);
  // }
  // @Emit()
  // private toggleSub(e: any) {
  //   console.info(e);
  // }
}
</script>
<style lang="scss" scoped>
.left-menu {
  color: #4e5f5b;
  display: flex;
  height: 100%;
  box-shadow: 1px 1px 1px 1px rgba(229, 229, 229, 0.36);
  margin: 10px 1px 0 5px;
  .main-menu {
    color: #e6e6e6;
    width: 230px;
    background-color: #ffffff;
    height: 100%;
    padding: 15px 0px;
    .avator {
      margin: 0 auto;
      width: 50px;
      height: 50px;
      background: #ffbd23;
      border-radius: 50%;
      text-align: center;
      overflow: hidden;
      box-shadow: 1px 1px 1px 1px #c3cbe3;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pers_name {
      line-height: 20px;
      margin: 12px 0;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      color: #000000;
      b {
        color: #adadad;
        font-size: 10px;
      }
    }
    .links {
      text-align: center;
      border-top: 2px solid #efefefb3;
      padding: 8px 0;
      margin-top: 10px;
      li {
        position: relative;
        display: block;
        a {
          display: block;
          color: #5c7ffc;
          padding: 14px 20px 14px 25px;
          cursor: pointer;
          text-decoration: none;

          &:hover {
            background-color: rgba(161, 161, 161, 0.09) !important;
            color: #5c7ffc;
            border-left: 3px solid #5c7ffc;
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
          }
          i {
            margin-right: 6px;
          }
        }
      }
    }
  }
  .sub-menu {
    position: relative;
    flex: 1 1 auto;
    width: 60%;
    background-color: #fcfcfd;
    span {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    ul {
      margin-top: 30px;
      li {
        height: 26px;
        line-height: 26px;
        a {
          color: #5c7ffc;
        }
      }
    }
  }
}
</style>
