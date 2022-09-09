<template>
  <div class="avue-contail" :class="{ 'avue--collapse': isCollapse }">
    <div class="avue-header">
      <top />
    </div>
    <div class="avue-layout">
      <div class="avue-left">
        <sidebar />
      </div>
      <div class="avue-main">
        <tags />
        <breadcrumb :collapse="isCollapse" />
        <div
          style="height: 100%; overflow-y: auto; overflow-x: hidden"
          id="avue-view"
        >
          <router-view class="avue-view" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags/";
import top from "./top/";
import sidebar from "./sidebar/";
import breadcrumb from "./breadcrumb/";
import admin from "@/util/admin";
export default {
  name: "index",
  components: {
    top,
    tags,
    sidebar,
    breadcrumb
  },
  computed: {
    ...mapGetters(["isCollapse", "permission"])
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
    }
  }
};
</script>
