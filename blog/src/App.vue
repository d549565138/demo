
<template>
  <!-- <firstPage class="hello"></firstPage> -->

  <div id="app"><router-view></router-view></div>
</template>



<script>
// import firstPage from "./views/firstPage.vue";

export default {
 name:'App'
};
</script>
<style lang="less" scoped>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  height:100vh;
}
</style>
