<template>
  <div class="add-article">
      <Back/>
    <div class="page-title">
      <h3>Add article page</h3>
    </div>
    <Form class="page-content" :label-width="80">
      <FormItem label="title">
        <Input v-model="title" style="width: 300px" placeholder="Enter title ..."/>
      </FormItem>
      <FormItem label="cover" prop="name">
        <Upload action="/api/upload" :on-success="handleSuccess" :show-upload-list="false">
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </FormItem>
      <img :src="url" alt>
      <FormItem label="type">
        <Select v-model="type" @on-change="typeChange()" style="width:300px">
          <Option v-for="item in typeList" :value="item.name" :key="item.name">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="subType">
        <Select v-model="subType" style="width:300px">
          <Option v-for="item in subTypeList" :value="item.name" :key="item.name">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="mediaType" prop="name">
        <Select v-model="mediaType" style="width:300px">
          <Option v-for="item in MediaTypeList" :value="item.name" :key="item.name">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <quillEditor
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        height="500px"
      />
      <Button @click="saveArticle">提交</Button>
      <Button type="primary" @click="publishArticle">提交</Button>
    </Form>
  </div>
</template>
<script>
import Back from "../components/Back.vue";
import { quillEditor, Quill } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
import { post } from "../../../../util/request";
import { Button, Table, Select, FormItem, Form, Upload, Input } from "iview";
import { Type, MediaType } from "../../../../util/type.js";
export default {
  name: "addarticle",
  data() {
    return {
      title: "",
      content: "",
      url: "",
      type: "",
      subType: "",
      mediaType: "",
      typeList: Type.type,
      subTypeList: [],
      MediaTypeList: MediaType,
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            action: "/api/upload",
            response: res => {
              return res.file;
            }
            // change: (xhr, formData) => {
            //    
            //   // xhr.setRequestHeader('myHeader','myValue')
            //   // formData.append('token', 'myToken')
            // } // 可选参
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  },
  methods: {
    typeChange() {
      this.subTypeList = Type.type.find(i => {
        return (i.name = this.type);
      }).subType;
    },
    handleSuccess(res, file) {
      this.url = res.file;
    },
    saveArticle() {
      const param = this.prepareParam();
      post("/api/addArticle", param)
        .then(res => {
          return res.json();
        })
        .then(res => {
           ;
        });
    },
    prepareParam() {
      let param = {};
      param.title = this.title;
      param.content = this.content;
      param.createTime = new Date();
      param.cover = this.url;
      param.type = this.type;
      param.subType = this.subType;
      param.mediaType = this.mediaType;
      return param;
    },
    publishArticle() {},
    onEditorBlur(quill) {
       ;
    },
    onEditorFocus(quill) {
       ;
    },
    onEditorReady(quill) {
       ;
    },
    onEditorChange({ quill, html, text }) {
       ;
      this.content = html;
    }
  },
  components: {
    quillEditor,
    Upload,
    Back
  }
};
</script>
<style lang="scss">
.add-article {
  .page-title {
    background: white;
    height: 45px;
    line-height: 45px;
    padding: 0 20px;
    margin-bottom: 10px;
  }
  .page-content {
    background-color: #fff;
    padding: 20px;

    .title {
      .cover {
        text-align: center;
        margin-top: 10px;
      }
      label {
        float: left;
        width: 200px;
        text-align: center;
      }
      div {
        overflow: hidden;
        input {
          width: 660px;
          border: none;
          height: 36px;
          line-height: 35px;
          font-size: 28px;
          outline: none;
          text-align: center;
          border-bottom: 1px solid #c4c4c4;
        }
      }
    }
    .type {
      label {
        float: left;
        width: 40px;
        text-align: center;
      }
      div {
        overflow: hidden;
      }
    }
  }
  .quill-editor {
    min-height: 400px;
    min-width: 500px;
    .ql-container {
      min-height: 400px;
    }
  }
  .red {
    color: red;
  }
}
</style>

