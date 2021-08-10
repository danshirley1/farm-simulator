<template>
  <div id="app" class="app h-100">
    <b-container fluid class="h-100">
      <b-row class="h-100">
        <b-col cols="12" class="mt-4">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  html {
    position: relative;
    min-height: 100%;
  }
  .app {
    position: relative;
    height: inherit;
  }
</style>
