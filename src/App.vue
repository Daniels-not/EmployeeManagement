<template>
  <div id="app">
    <nav-bar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
export default {
  name: "app",
  components: {
    navBar
  }
}
</script>
>

<style lang="scss">

</style>
