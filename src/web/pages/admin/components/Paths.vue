<template>
  <ul class="path">
    <li
      :class="activeIndex == index ?'active' :'ddd'"
      v-bind:key="i.name"
      @click.prevent="tab(index)"
      v-for="(i,index) in paths"
    >
      <router-link :to="i.path">
        <i :class="i.icon"></i>
        {{i.name}}
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: "Paths",
  props: {
    paths: Array
  },
  methods: {
    tab(index) {
      this.activeIndex = index;
    }
  },
  created: function() {},
  data: function() {
    return {
      activeIndex: -1
    };
  }
};
</script>
<style lang="less" scoped>
.path {
  display: flex;
  background-color: #fff;

  align-items: center;
  li {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    a {
      color: #5c7ffc;
    }
  }
  .active {
    border-top: 2px solid #5194e9;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
    
  }
}
</style>


