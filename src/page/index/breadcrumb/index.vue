<template>
    <div class="menu-breadcrumb" :class="[{ 'menu-breadcrumb--active': collapse }]" @click="setCollapse"></div>
</template>
<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
  },
};
</script>

