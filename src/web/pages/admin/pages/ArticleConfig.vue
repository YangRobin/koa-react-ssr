<template>
  <div>
    config
    <Table :columns="configCol" :data="configList"></Table>
    <Modal @on-ok="topModalOk" @on-cancel="topMoalCancel" v-model="topListVisible" title="置顶配置">
      <Table :columns="topCol" :data="topList"></Table>
    </Modal>
  </div>
</template>
<script>
import { Table, Modal } from "iview";
import { get } from "../../../../util/request";
export default {
  name: "ArticleConfig",
  data() {
    return {
      topListVisible: false,
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
          key: "title"
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
                      this.editConfig();
                      console.log(params);
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
    editConfig() {
      this.showTopModal();
    },
    showTopModal() {
      this.topListVisible = true;
    },
    topModalOk() {
      this.topMoalCancel();
    },
    topMoalCancel() {
      this.topListVisible = false;
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

