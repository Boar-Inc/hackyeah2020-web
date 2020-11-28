<template>
  <div>
    <div class="bg" />
    <Nuxt />
  </div>
</template>

<style lang="scss">
@import "~/styles/layouts.scss";

.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
.padded {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: content-box;
  padding-bottom: 60px;
}
.padded-wide {
  max-width: 850px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: content-box;
  padding-bottom: 60px;
}
</style>
