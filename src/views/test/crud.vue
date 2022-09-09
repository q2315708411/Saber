<template>
  <basic-container>
    <h3>表格例子</h3>
    <el-button size="small" @click="goBack">回退</el-button>
    <avue-crud
      :option="option"
      :page.sync="page"
      :data="data"
      :permission="permissionList"
    ></avue-crud>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      page: {
        total: 122,
      },
      data: [
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名",
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名",
        },

        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名",
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名",
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名",
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名",
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名",
        },
      ],
      option: {
        column: [
          {
            label: "用户名",
            prop: "username",
            span: 14,
            row: true,
          },
          {
            label: "姓名",
            prop: "name",
            span: 14,
            row: true,
          },
          {
            label: "密码",
            prop: "password",
            type: "password",
            span: 14,
            row: true,
          },
          {
            label: "确认密码",
            prop: "newpassword",
            type: "password",
            hide: true,
            span: 14,
            row: true,
          },
          {
            label: "申请日期",
            prop: "date",
            type: "date",
            span: 14,
            row: true,
          },
          {
            label: "个性签名",
            prop: "textarea",
            type: "textarea",
            minRows: 8,
            span: 24,
            overHidden: true,
            row: true,
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    // 权限按钮，默认四个：增删改查
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.user_add, false),
        viewBtn: this.vaildData(this.permission.user_view, false),
        delBtn: this.vaildData(this.permission.user_delete, false),
        editBtn: this.vaildData(this.permission.user_edit, false),
      };
    },
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
};
</script>

<style>
</style>
