<template>
  <div class="add-article">
    <Back/>
    <div class="page-title">
      <h3>{{operation}}</h3>
    </div>
    <Form class="page-content" :label-width="80">
      <FormItem label="title">
        <Input v-model="article.title" style="width: 300px" placeholder="Enter title ..."/>
      </FormItem>
      <FormItem label="cover" prop="name">
        <Upload action="/api/upload" :on-success="handleSuccess" :show-upload-list="false">
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </FormItem>
      <FormItem label="coverpreview" prop="coverpreview">
        <!-- <img :src="article.cover" alt> -->
        <!-- <video :src="article.cover" width="400px" controls="controls"></video> -->
      </FormItem>

      <FormItem label="type">
        <Select v-model="article.type" @on-change="typeChange()" style="width:300px">
          <Option v-for="item in typeList" :value="item.name" :key="item.name">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="subType">
        <Select v-model="article.subType" style="width:300px">
          <Option v-for="item in subTypeList" :value="item.name" :key="item.name">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="mediaType" prop="name">
        <Select v-model="article.mediaType" style="width:300px">
          <Option v-for="item in MediaTypeList" :value="item.name" :key="item.name">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <quillEditor
        ref="myTextEditor"
        v-model="article.content"
        :options="editorOption"
        height="500px"
      />
      <!--
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
         <div class="quill-code">
        <code class="hljs" v-html="contentCode"></code>
      </div>-->
      <div class="post-btn">
        <Button @click="saveArticle">提交</Button>
        <Button type="primary" @click="goback">取消</Button>
      </div>
    </Form>
  </div>
</template>
<script>
import Back from "../components/Back.vue";
import { quillEditor, Quill } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "highlight.js/styles/monokai-sublime.css";
import { post } from "../../../../util/request";
import {
  Button,
  Table,
  Select,
  FormItem,
  Form,
  Upload,
  Modal,
  Input
} from "iview";
import { Type, MediaType } from "../../../../util/type.js";
import hljs from "highlight.js";
import CONST from "../../../../util/const.js";
import {
  container,
  ImageExtend,
  QuillWatch,
  theme
} from "quill-image-extend-module";

// Quill.register("modules/Theme", theme);
Quill.register("modules/ImageExtend", ImageExtend);

export default {
  name: "addarticle",
  data() {
    return {
      operation: "添加文章",
      operate: CONST.OPERATION.ADD,
      typeList: [],
      subTypeList: [],
      MediaTypeList: MediaType,
      article: {
        title: "",
        content: "",
        cover: "",
        type: "",
        subType: "",
        mediaType: ""
      },
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            action: "/api/upload",
            response: res => {
              return res.file;
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                console.log("test")
                QuillWatch.emit(this.quill.id);
              }
            }
          },
          // toolbar: [
          //   ["bold", "italic", "underline", "strike"],
          //   ["blockquote", "code-block"],
          //   [{ header: 1 }, { header: 2 }],
          //   [{ list: "ordered" }, { list: "bullet" }],
          //   [{ script: "sub" }, { script: "super" }],
          //   [{ indent: "-1" }, { indent: "+1" }],
          //   [{ direction: "rtl" }],
          //   [{ size: ["small", false, "large", "huge"] }],
          //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
          //   [{ font: [] }],
          //   [{ color: [] }, { background: [] }],
          //   [{ align: [] }],
          //   ["clean"],
          //   ["link", "image", "video"]
          // ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  beforeMount() {
    this.typeList = Type.type;
    if (this.$route.params.id !== "null") {
      this.operation = "编辑文章";
      this.operate = CONST.OPERATION.EDIT;
      this.queryArticleById(this.$route.params.id)
        .then(res => {
          this.article = res.result;
          this.subTypeList =
            Type.type.find(i => {
              return i.name === this.article.type;
            }).subType || [];
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    console.log("robin");
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  },
  methods: {
    queryArticleById(id) {
      return post("/api/queryArticleById", { id });
    },
    updateArticle(article) {
      post("/api/updateArticle", article).then(res => {
        if (res.success) {
          this.$Modal.info({
            title: "编辑成功!"
          });
          this.goback();
        }
      });
    },
    goback() {
      window.history.back();
    },
    typeChange() {
      console.log(Type.type);
      this.subTypeList =
        Type.type.find(i => {
          return i.name === this.article.type;
        }).subType || [];
    },
    handleSuccess(res, file) {
      this.article.cover = res.file;
    },
    validParam(param) {
      if (!param.type || !param.subType || !param.mediaType) {
        return false;
      }
      return true;
    },
    saveArticle() {
      const param = this.prepareParam();
      if (!this.validParam(param)) {
        this.$Modal.error({
          title: "类型未填写完整!"
        });
        return;
      }
      if (this.operate === CONST.OPERATION.ADD) {
        this.addArticle(param);
      } else {
        this.updateArticle(param);
      }
    },
    addArticle(param) {
      post("/api/addArticle", param)
        .then(res => {
          if (res.success) {
            this.goback();
          }
        })
        .catch(err => {
          this.$Modal.error({
            title: err
          });
        });
    },
    prepareParam() {
      let param = this.article;
      param.createTime = new Date();
      return param;
    },
    publishArticle() {},
    onEditorBlur(quill) {},
    onEditorFocus(quill) {},
    onEditorReady(quill) {},
    onEditorChange({ quill, html, text }) {
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
    .post-btn {
      margin-top: 10px;
    }
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

