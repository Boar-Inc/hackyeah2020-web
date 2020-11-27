<template>
  <div class="panel" :class="[open && 'open']">
    <div class="corner" @click="open = !open">
      <IconLabel :icon="open ? 'bx-x' : 'bxs-info-circle'" />
    </div>
    <div class="text">
      <h1>Co to jest ASF?</h1>
      <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
      <h1>Co to jest ASF?</h1>
      <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss" scoped>
.corner {
  position: absolute;
  top: 10px;
  right: 10px;
  font-family: $display-stack;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
}
.panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  color: white;
  z-index: 9999999999999999;
  clip-path: circle(80px at 100% 0%);
  transition: .4s all ease-in-out;

  &.open {
    clip-path: circle(150% at 100% 0%);
    transition: .4s all ease-in-out;
  }
}
.text {
  margin: 0 auto;
  margin-top: 40px;
  max-width: 600px;
  padding: 0 20px;
}
h1 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  margin-top: 40px;
  font-weight: 600;
}
</style>
