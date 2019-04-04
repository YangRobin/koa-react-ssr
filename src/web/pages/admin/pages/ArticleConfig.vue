<template>
  <div>
    config
    <Table :columns="configCol" :data="configList"></Table>
    <Modal @on-ok="topModalOk" width="700px" @on-cancel="topMoalCancel" v-model="topListVisible" title="置顶配置">
      <Form ref="formValidate" :label-width="80">
        <FormItem label="文章标题" prop="searchParam.title">
          <Input placeholder="请输入文章标题"/>
        </FormItem>
        <FormItem label="关键字" prop="searchParam.keyword">
          <Input placeholder="请输入关键字"/>
        </FormItem>
        <FormItem label="文章类型">
          <Select v-model="searchParam.type">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="创建日期" prop="searchParam.gmtCreate">
          <DatePicker type="date" placeholder="Select date" v-model="searchParam.date"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary">查询</Button>
          <Button type="default">重置</Button>
        </FormItem>
      </Form>
      <Table :columns="topCol" :data="topList"></Table>
    </Modal>
  </div>
</template>
<script>
import { get } from "../../../../util/request";
export default {
  name: "ArticleConfig",
  data() {
    return {
      searchParam: {},
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

