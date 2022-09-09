<template>
  <div class="avue-top">
    <!-- logo -->
    <div class="top-bar-logo">
      <img src="~@/assets/img/logo.svg" alt="logo">
    </div>
    <!-- title -->
    <div class="top-bar-title">
      {{ website.title }}
    </div>
    <!-- 自动撑开 -->
    <div style="flex:auto"></div>
    <!-- 人员信息 -->
    <div class="top-bar-user">
      <img class="top-bar__img" :src="userInfo.avatar" />
      <!--  trigger="click" -->
      <el-dropdown
        :show-timeout="50">
        <span class="el-dropdown-link">
          {{ userInfo.user_name||'本地开发人员' }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu class="user-drop-item" slot="dropdown">
          <el-dropdown-item @click.native="logout"
            >{{ $t("navbar.logOut") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "top",
  computed: {
    ...mapGetters(["userInfo", "website"]),
  },
  methods: {
    logout() {
      this.$confirm('退出系统, 是否继续?', '提示', {
        confirmButtonText: this.$t("submitText"),
        cancelButtonText: this.$t("cancelText"),
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    }
  },
};
</script>