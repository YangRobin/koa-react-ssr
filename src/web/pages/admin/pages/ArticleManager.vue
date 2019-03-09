
<template>
  <div>
    <div>
      <div class="add-header">
        <h3>Article List</h3>
        <router-link class="link-btn" to="/add-article">Add article</router-link>
      </div>
      <div>
        <Table :columns="columns" :data="list"></Table>
      </div>
    </div>
    <!-- <AddArticle/> -->
  </div>
</template>
<script>
import AddArticle from "./AddArticle";
import { Table, Button } from "iview";
import { post } from "../../../../util/request";
export default {
  name: "articleManager",
  data() {
    return {
      page: 1,
      pageSize: 10,
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
                      // this.show(params.index);
                      console.log(params);
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
                      console.log(params);
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
  mounted() {
    post("api/queryArticleByPage", {
      page: this.page,
      pageSize: this.pageSize
    }).then(res => {
      if (res.success) {
        this.list = res.result;
      }
    });
  },
  components: {
    AddArticle
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

