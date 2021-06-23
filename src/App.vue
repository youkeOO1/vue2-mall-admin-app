<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    console.log(this.prototype);
  },
};
</script>

<style>
#app{
  height: 100%;
}

</style>
