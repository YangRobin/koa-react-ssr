<template>
  <div>
    config
    <Table :columns="configCol" :data="configList"></Table>
    <Modal
      @on-ok="topModalOk"
      width="700px"
      @on-cancel="topMoalCancel"
      v-model="topListVisible"
      title="置顶配置"
    >
      <Form ref="formValidate" :label-width="80">
        <FormItem label="文章标题" prop="searchParam.title">
          <Input v-model="searchParam.title" placeholder="请输入文章标题"/>
        </FormItem>
        <FormItem label="关键字" prop="searchParam.keyword">
          <Input v-model="searchParam.keyword" placeholder="请输入关键字"/>
        </FormItem>
        <FormItem label="创建日期">
          <DatePicker type="date" placeholder="Select date" v-model="searchParam.gmtCreate"></DatePicker>
        </FormItem>
        <FormItem>
          <Button @click="queryArticle" type="primary">查询</Button>
          <Button type="default" @click="reset">重置</Button>
        </FormItem>
      </Form>
      <div class="article-list">
        <RadioGroup v-model="animal">
          <div class="radio-item" v-for="i in topList" :key="i.id">
            <Radio :label="i.id"/>
            <span>{{i.title}}</span>
            <span>{{i.type}}</span>
            <span>{{i.create_time}}</span>
          </div>
        </RadioGroup>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Modal } from "iview";
import { get, post } from "../../../../util/request";
export default {
  name: "ArticleConfig",
  data() {
    return {
      target: {},
      pageSize: 5,
      page: 1,
      searchParam: {
        title: "",
        gmtCreate: "",
        keyWord: ""
      },
      animal: 0,
      topListVisible: false,
      topList: [],
      topCol: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "title",
          key: "title"
        }
      ],
      configList: [
        {
          id: "id"
        }
      ],
      configCol: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "article_id",
          key: "article_id"
        },
        {
          title: "title",
          render: (h, params) => {
            return h(
              "span",
               params.row.article && params.row.article.length ? params.row.article[0].title : ""
            );
          }
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editConfig(params.row.id);
                      // this.$router.push("/add-article/" + params.row.id);
                      // this.show(params.index);
                    }
                  }
                },
                "edit"
              )
            ]);
          }
        }
      ]
    };
  },
  mounted() {
    this.queryConfigList();
  },
  methods: {
    pageChange() {
      this.queryArticle();
    },
    reset() {
      this.searchParam = {};
    },
    valideParam() {
      let isValid = false;
      for (let i in this.searchParam) {
        if (this.searchParam[i]) {
          isValid = true;
        }
      }
      return isValid;
    },
    queryArticle() {
      if (!this.valideParam()) {
        Modal.error({
          title: "请至少输入一个查询条件"
        });
        return;
      }
      post("/api/queryArticle", this.searchParam).then(res => {
        if (res.success) {
          this.topList = res.result;
        }
      });
    },
    editConfig(id) {
      this.target.id = id;
      this.showTopModal();
    },
    showTopModal() {
      this.topListVisible = true;
    },
    topModalOk() {
      this.updateConfig(this.target.id, this.animal);
      this.topMoalCancel();
    },
    updateConfig(id, articleId) {
      post("/api/updateConfig", { id, articleId }).then(res => {
      });
    },
    topMoalCancel() {
      this.topListVisible = false;
      this.topList = [];
    },
    queryConfigList() {
      get("/api/queryConfigList")
        .then(res => {
          if (res.success) {
            this.configList = res.result;
          }
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.article-list {
  padding: 20px;
  border: 1px solid #e7e7e7;
  .radio-item {
    padding: 5px;
    border-bottom: 1px solid #e7e7e7;
  }
}
</style>
