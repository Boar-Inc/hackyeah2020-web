<template>
  <vl-feature v-if="pos">
    <vl-geom-point :coordinates="pos" />
    <vl-style-box>
      <vl-style-icon :src="src" :scale="scale" :anchor="[0.5, 1]" />
    </vl-style-box>
  </vl-feature>
</template>

<script>
export default {
  props: {
    pos: Array,
    src: String,
    scale: {
      default: 0.4,
      type: Number
    }
  }
}
</script>

<style>

</style>
