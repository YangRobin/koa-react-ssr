import { types } from 'node-sass';
<template>
  <div :class="visible ?'show':'hide'">
    <div @click.stop="close" class="modal-mask"></div>
    <div class="modal-wrapper">
      <div class="modal" :style="{width:size}">
        <div class="modal-header">
          <slot name="header">
            <span  class="close-btn" @click="close"></span>
            <!-- <i @click="close" class="close-btn iconfont icon-check-circle"></i> -->
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <h3>这是弹框</h3>
            <p>这真的时个弹框！</p>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button @click="close" class="modal-btn btn-red" style="margin-right:10px">{{closeText || '取消'}}</button>
            <button @click="close" class="modal-btn btn-green">{{okText || '确定'}}</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      visible:this.value
    };
  },
  updated() {
     
  },
  methods: {
    close() {
      this.visible=false;
      this.$emit('input',false)
    }
  },
  props: {
    value:{
      type:Boolean,
      default:false,
    },
    size:{
      type:String,
      default:'600px'
    },
    okText:{
      type:String,
      default:'确定'
    },
    closeText:{
      type:String,
      default:'取消'
    },
  },
  watch:{
    value(val){
      this.visible=val
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  height: 100%;
  z-index: 1000;
}
.modal-wrapper {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  .modal {
    position: relative;
    top: 100px;
    background-color: #fff;
    width: 520px;
    margin: 0 auto;
    border-radius: 10px;
    .modal-header {
      overflow: hidden;
      padding: 5px 5px;
      .close-btn {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-color: #f11c1c;
        border-radius: 50%;
      }
    }
    .modal-body{
       padding: 5px 5px;
    }
    .modal-footer{
       padding: 5px 5px;
    }
  }
}
</style>
