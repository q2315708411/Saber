<template>
  <div class="avue-sidebar">
    <el-scrollbar style="height: 100%">
      <div v-if="validatenull(menu)" class="avue-sidebar--tip">
        {{ $t("menuTip") }}
      </div>
      <el-menu
        unique-opened
        :default-active="nowTagValue"
        mode="vertical"
        :show-timeout="200"
        :collapse="keyCollapse"
      >
        <sidebar-item
          :menu="menu"
          :screen="screen"
          first
          :collapse="keyCollapse"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebarItem";
export default {
  name: "sidebar",
  components: { sidebarItem },
  computed: {
    ...mapGetters(["menu", "keyCollapse", "screen"]),
    nowTagValue() {
      return this.$route.path;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

