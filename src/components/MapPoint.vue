<template>
  <vl-feature v-if="pos" :properties="properties">
    <vl-geom-point :coordinates="pos" />
    <vl-style-box>
      <vl-style-icon :src="src" :scale="scale" :anchor="anchor || [0.5, 0.5]" />
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
    },
    properties: Object,
    anchor: Array
  }
}
</script>

<style>

</style>
