<template>
  <div>
    <div>
      <div class="add-header">
        <h3>文章管理</h3>
        <div>
          <!-- <Button @click="showTopModal" type="primary">置顶配置</Button> -->
          <router-link class="link-btn" to="/article-config">置顶配置</router-link>
          <router-link class="link-btn" to="/add-article/null">添加文章</router-link>
        </div>
      </div>
      <div>
        <Table :columns="columns" :data="list"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="total" :current="page" :page-size="pageSize" @on-change="changePage"></Page>
          </div>
        </div>
      </div>
    </div>
    <!-- <AddArticle/> -->
    <Modal @on-ok="topModalOk" @on-cancel="topMoalCancel" v-model="topListVisible" title="置顶配置">
      <Table :columns="topCol" :data="topList"></Table>
    </Modal>
  </div>
</template>
<script>
import AddArticle from "./AddArticle";
import { post } from "../../../../util/request";
export default {
  name: "articleManager",
  data() {
    return {
      topList: [{ id: 1, articleId: 1, title: "没有" }],
      topCol: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "articleId",
          key: "articleId"
        },
        {
          title: "title",
          key: "title"
        }
      ],
      page: 1,
      pageSize: 10,
      total: 0,
      topListVisible: false,
      columns: [
        {
          title: "id",
          key: "id"
        },
        {
          title: "title",
          key: "title"
        },
        {
          title: "type",
          key: "type"
        },
        {
          title: "sub_type",
          key: "sub_type"
        },
        {
          title: "media_type",
          key: "media_type"
        },
        {
          title: "creator",
          key: "creator"
        },
        {
          title: "create_time",
          key: "create_time"
        },
        {
          title: "gmt_modify",
          key: "gmt_modify"
        },
        {
          title: "praise_times",
          key: "praise_times"
        },
        {
          title: "discard",
          key: "discard"
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
                      console.log(params);
                      this.$router.push("/add-article/" + params.row.id);
                      // this.show(params.index);
                    }
                  }
                },
                "edit"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index);
                    }
                  }
                },
                params.row.discard === 0 ? "online" : " offline"
              )
            ]);
          }
        }
      ],
      list: []
    };
  },
  methods: {
    showTopModal() {
      this.topListVisible = true;
    },
    topModalOk() {
      this.topListVisible = false;
    },
    topMoalCancel() {
      this.topListVisible = false;
    },
    changePage(page) {
      this.queryArticleByPage(page);
    },
    queryArticleByPage(page) {
      post("api/queryArticleByPage", {
        page,
        pageSize: this.pageSize
      }).then(res => {
        if (res.success) {
          this.list = res.result;
          this.total = res.total;
        }
      });
    }
  },
  mounted() {
    this.queryArticleByPage(this.page);
  },
  components: {
    AddArticle
  },
  filters: {
    timeFilter(time) {
      return time + "###";
    }
  }
};
</script>
<style lang="scss" scoped>
.add-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: white;
  margin-bottom: 5px;
  .link-btn {
    padding: 5px;
    border-radius: 5px;
    background: #2d8cf0;
    color: white;
  }
}
</style>

