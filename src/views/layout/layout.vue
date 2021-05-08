<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container"></div>
  </div>
</template>

<script>
import sidebar from './components/siderbar/index';
export default {
  data() {
    return {};
  },
  components: {
    sidebar
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import './style/layout.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
