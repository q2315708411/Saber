<template>
  <div class="avue-tags">
    <!-- tag盒子 -->
    <div
      v-if="contextmenuFlag"
      class="avue-tags__contentmenu"
      :style="{ left: contentmenuX + 'px', top: contentmenuY + 'px' }"
    >
      <div class="item" @click="clearCacheTags">
        {{ $t("tagsView.clearCache") }}
      </div>
      <div class="item" @click="closeOthersTags">
        {{ $t("tagsView.closeOthers") }}
      </div>
      <div class="item" @click="closeAllTags">
        {{ $t("tagsView.closeAll") }}
      </div>
    </div>
    <div
      class="avue-tags__box"
      :class="{ 'avue-tags__box--close': !website.isFirstPage }"
    >
      <el-tabs
        v-model="active"
        type="card"
        @contextmenu.native="handleContextmenu"
        :closable="tagLen !== 1"
        @tab-click="openTag"
        @edit="menuTag"
      >
        <el-tab-pane
          :key="item.value"
          v-for="item in tagList"
          :label="generateTitle(item)"
          :name="item.value"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { clearCache } from "@/api/user";
import { validatenull } from "@/util/validate";
import { setTitle, generateTitle, getPath } from "@/util/router.js";

export default {
  name: "tags",
  data() {
    return {
      active: "",
      contentmenuX: "",
      contentmenuY: "",
      contextmenuFlag: false,
    };
  },
  mounted() {
    this.addTags();
  },
  watch: {
    tag() {
      this.setActive();
    },
    $route() {
      this.addTags();
    },
    contextmenuFlag() {
      window.addEventListener("mousedown", this.watchContextmenu);
    },
  },
  computed: {
    ...mapGetters(["tagWel", "tagList", "tag", "website"]),
    tagLen() {
      return this.tagList.length;
    },
  },
  methods: {
    generateTitle(item) {
      return generateTitle(item.label, (item.meta || {}).i18n);
    },
    watchContextmenu(event) {
      if (!this.$el.contains(event.target) || event.button !== 0) {
        this.contextmenuFlag = false;
      }
      window.removeEventListener("mousedown", this.watchContextmenu);
    },
    handleContextmenu(event) {
      let target = event.target;
      // 解决 https://github.com/d2-projects/d2-admin/issues/54
      let flag = false;
      if (target.className.indexOf("el-tabs__item") > -1) flag = true;
      else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
        target = target.parentNode;
        flag = true;
      }
      if (flag) {
        event.preventDefault();
        event.stopPropagation();
        this.contentmenuX = event.clientX;
        this.contentmenuY = event.clientY;
        this.tagName = target.getAttribute("aria-controls").slice(5);
        this.contextmenuFlag = true;
      }
    },
    // 新增路由
    addTags() {
      const value = this.$route.query.src || this.$route.fullPath;
      const label = this.$route.query.name || this.$route.name;
      const meta = this.$route.meta || this.$store.getters.meta || {};
      const i18n = this.$route.query.i18n;
      if (!validatenull(value) && !validatenull(label)) {
        this.$store.commit("ADD_TAG", {
          label: label,
          value: value,
          params: this.$route.params,
          query: this.$route.query,
          meta: (() => {
            if (!i18n) {
              return meta;
            }
            return {
              i18n: i18n,
            };
          })(),
          group: this.$store.getters.group || [],
        });
        this.setCurTitle(label,i18n);
      }
    },
    // 设置当前标题
    setCurTitle(label,i18n){
      let title = label;
      title = generateTitle(label, i18n);
      //判断登录页的情况
      if (this.$router.history.current.fullPath === "/login") {
        title = "登录";
      }
      //根据当前的标签也获取label的值动态设置浏览器标题
      setTitle(title);
    },
    //激活当前选项
    setActive() {
      this.active = this.tag.value;
    },
    menuTag(value, action) {
      if (action === "remove") {
        let { tag, key } = this.findTag(value);
        this.$store.commit("DEL_TAG", tag);
        if (tag.value === this.tag.value) {
          tag = this.tagList[key === 0 ? key : key - 1]; //如果关闭本标签让前推一个
          this.openTag(tag);
        }
      }
    },
    openTag(item) {
      let tag;
      if (item.name) {
        tag = this.findTag(item.name).tag;
      } else {
        tag = item;
      }
      // 路由跳转
      this.$router.push({
        path: getPath(
          {
            name: tag.label,
            src: tag.value,
          },
          tag.meta
        ),
        query: tag.query,
      });
    },
    closeOthersTags() {
      this.contextmenuFlag = false;
      this.$store.commit("DEL_TAG_OTHER");
    },
    findTag(value) {
      let tag, key;
      this.tagList.map((item, index) => {
        if (item.value === value) {
          tag = item;
          key = index;
        }
      });
      return { tag: tag, key: key };
    },
    closeAllTags() {
      this.contextmenuFlag = false;
      this.$store.commit("DEL_ALL_TAG");
      this.$router.push({
        path: getPath({
          src: this.tagWel.value,
        }),
        query: this.tagWel.query,
      });
    },
    clearCacheTags() {
      this.$confirm("是否需要清除缓存?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        clearCache().then(() => {
          this.contextmenuFlag = false;
          this.$message.success("清除完毕");
        });
      });
    },
  },
};
</script>


