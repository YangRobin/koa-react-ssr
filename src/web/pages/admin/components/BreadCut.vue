<template>
  <div class="row bread-cut">
    <span>你当前的位置:
      <br>
    </span>
    <ul>
      <li v-bind:key="i.name" v-for="i in paths">{{i.name}}</li>
    </ul>
  </div>
</template>
<script >
import menu from "../menu";
export default {
  name: "BreadCut",
  data() {
    return {
      paths: [menu[0]]
    };
  },
  methods: {
    getName(menu, path) {
      return menu.find(i => {
        if (i.path === path) {
          this.paths.push(i);
        } else {
          if (i.children) {
            this.getName(i.children, path);
          }
        }
      });
    }
  },
  watch: {
    $route(val, oldVal) {
      this.paths = [];
      const routes = val.fullPath.match(/\/[^/]*/gim).filter(i => {
        return i;
      });
      let temp = [];
      for (let j = 0; j < routes.length; j++) {
        if (j > 0) {
          temp.push(routes[j - 1] + routes[j]);
        } else {
          temp.push(routes[j]);
        }
      }
      temp.forEach(item => {
        this.getName(menu, item);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.bread-cut {
  padding-left: 10px;
  color: #7188fc;
  font-size: 13px;
  border-bottom: 1px solid #f6f6f6;
  background: white;
  border-left: 2px solid #65c465;
  height: 30px;
  line-height: 30px;
  font-weight: 500;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
  ul {
    overflow: hidden;
    height: 30px;
    color: #4e5f5b;
    min-width: 60px;
    border-radius: 3px;
    li {
      float: left;
      list-style: none;
      margin-right: 5px;
      color: #8c8c8c;
      font-size: 12px;
      a {
        text-decoration: none;
      }
    }
  }
}
</style>
