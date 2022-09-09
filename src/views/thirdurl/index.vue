<template>
  <div class="frame-contaner">
    <iframe
      :src="frameUrl"
      frameborder="0"
      allowfullscreen
      class="frame-content"
    ></iframe>
  </div>
</template>
<script>
import { isURL } from "@/util/validate";
export default {
  name: "thirdurl",
  computed: {
    frameUrl() {
      const routePath = this.$route.path;
      // 截取thirdurl后的地址
      var keyIdx = routePath.indexOf('/thirdurl/');
      var url = routePath.substring(keyIdx + 10);
      // 解码
      var acturalUrl = decodeURIComponent(url);
      // 判断合法
      if (!isURL(acturalUrl)) {
        this.$message.warning("地址不合法");
        return;
      }
      return acturalUrl;
    },
  },
};
</script>
<style lang="scss" scoped>
.frame-contaner {
  width: 100%;
  height: 100%;
}
.frame-content {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>

