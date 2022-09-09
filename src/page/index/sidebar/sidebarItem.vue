<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item
        v-if="(validatenull(item.children) && !item.hidden)||item.isFirst"
        :index="item.path+item.name"
        @click.native="open(item)"
        :key="item.name"
        :class="{ 'is-active': vaildActive(item) }"
      >
        <i :class="item.icon"></i>
        <span slot="title" :alt="item.path">{{ generateTitle(item) }}</span>
      </el-menu-item>
      <el-submenu
        v-else-if="!validatenull(item.children) && !item.hidden"
        :index="item.path+item.name"
        :key="item.name"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span
            slot="title"
            :class="{ 'el-menu--display': collapse && first }"
            >{{ generateTitle(item) }}</span
          >
        </template>
        <template v-for="(child, cindex) in item.children">
          <el-menu-item
            :index="child.path"
            @click.native="open(child)"
            v-if="validatenull(child.children) && !child.hidden"
            :class="{ 'is-active': vaildActive(child) }"
            :key="child.name"
          >
            <i :class="child.icon"></i>
            <span slot="title">{{ generateTitle(child) }}</span>
          </el-menu-item>
          <sidebar-item
            v-else
            :menu="[child]"
            :key="cindex"
            :props="props"
            :screen="screen"
            :collapse="collapse"
          ></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { isURL, validatenull } from "@/util/validate";
import { getPath, getValue, generateTitle } from "@/util/router.js";

export default {
  name: "sidebarItem",
  props: {
    menu: {
      type: Array,
    },
    screen: {
      type: Number,
    },
    first: {
      type: Boolean,
      default: false,
    },
    collapse: {
      type: Boolean,
    },
  },
  computed: {
    nowTagValue() {
      return getValue(this.$route);
    }
  },
  methods: {
    generateTitle(item) {
      return generateTitle(
        item.name,
        (item.meta || {}).i18n
      );
    },
    vaildActive(item) {
      if (this.validIsOpen(item)) {
        return false;
      }
      const groupFlag = (item["group"] || []).some((ele) =>
        this.$route.path.includes(ele)
      );
      // 首页特殊处理
      const firstActive = item.isFirst && this.nowTagValue === item.redirect;
      return this.nowTagValue === item.path || firstActive || groupFlag;
    },
    validatenull(val) {
      return validatenull(val);
    },
    validIsOpen(item) {
      if (item.isOpen === 2 && isURL(item.path)) {
        return true;
      }
    },
    open(item) {
      if (this.screen <= 1){
        this.$store.commit("SET_COLLAPSE");
      }
      if (this.validIsOpen(item)) {
        window.open(item.path);
      } else {
         this.$router.push({
          path: getPath({
            name: item.name,
            src: item.path
          }, item.meta),
          query: item.query
        });
      }
    },
  },
};
</script>

