<template>
  <div class="label" :class="[right && 'right']">
    <i :class="['bx', ...icon.split(' ')]" />
    <div v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    right: Boolean
  }
}
</script>

<style lang="scss" scoped>
.label {
  @include flex-center(v);

  & > i {
    font-size: 1.1em;
  }

  & > i + div {
    @include flex-center(v);
    margin-left: 12px;
  }

  &.right {
    flex-direction: row-reverse;

    & > i + div {
      margin-left: 0;
      margin-right: 7px;
    }
  }
}
</style>
