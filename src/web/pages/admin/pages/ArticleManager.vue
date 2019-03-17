<template>
  <div>
    <div>
      <div class="add-header">
        <h3>Article List</h3>
        <router-link class="link-btn" to="/add-article/null">Add article</router-link>
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
  </div>
</template>
<script>
import AddArticle from "./AddArticle";
import { Table, Button, Page } from "iview";
import { post } from "../../../../util/request";
export default {
  name: "articleManager",
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
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
          key: "create_time",
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

