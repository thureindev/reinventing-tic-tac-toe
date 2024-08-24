<template>
  <DashboardView></DashboardView>

  <!-- <img alt="Vue logo" src="./assets/logo.png">

  <HeadBanner desc="New Game" />
  <GameModeHUD /> -->
</template>

<script>
// import GameModeHUD from "./components/GameModeHUD.vue";
// import HeadBanner from "./components/HeadBanner.vue";
import DashboardView from "./components/DashboardView.vue";

export default {
  name: 'App',
  components: {
    // GameModeHUD,
    // HeadBanner,
    DashboardView,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>