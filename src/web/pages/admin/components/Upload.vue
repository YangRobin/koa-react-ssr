<template>
  <div class="upload" :style="{width:width,height:height,lineHeight:height}" @click="uploadFile">
    <span class="tips">点击上传</span>
    <img class="preview" :src="defaultUrl" alt>
    <div>
      <input id="file" @change="fileChange" type="file">
    </div>
  </div>
</template>
<script>
export default {
  name: "Upload",
  data() {
    return {
      defaultUrl: this.value
    };
  },
  methods: {
    test(e) {
      console.dir(e);
    },
    uploadFile() {
      let input = document.getElementById("file");
      input.dispatchEvent(new MouseEvent("click"));
    },
    fileChange(e) {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      fetch("/api/upload", {
        method: "post",
        body: formData
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          this.defaultUrl = res.file;
        })
        .catch(err => {
          console.warn(err);
        });
    }
  },
  props: {
    value: {
      type: String,
      default: false
    },
    width: {
      type: String,
      default: "160px"
    },
    height: {
      type: String,
      default: "90px"
    }
  },
  watch: {
    value(val) {
      this.defaultUrl = val;
    }
  }
};
</script>
<style lang="scss">
.upload {
  width: 100px;
  height: 100px;
  line-height: 100px;
  background: #f6f6f6;
  overflow: hidden;
  position: relative;
  text-align: center;
  .tips {
    color: #b0b0b0;
  }
  .preview {
    width: inherit;
    height: inherit;
  }
  #file {
    display: none;
  }
}
</style>


