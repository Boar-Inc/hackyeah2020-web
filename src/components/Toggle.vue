<template>
  <div class="toggle">
    <div v-for="({text, icon}, idx) in opts" :key="idx" class="toggle-opt" :class="[idx == active && 'active']">
      <IconLabel :icon="icon" @click.native="$emit('update:active', idx)">
        {{text}}
      </IconLabel>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opts: Array,
    active: Number
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  color: black;
  display: flex;
  border-radius: 10px;
  border: 1px solid black;
  flex-direction: row;

  @include tablet-up {
    flex-direction: row;
  }

  @media (max-width: 600px) {
    ::v-deep i {
      display: none;
    }
    ::v-deep .label > i + div {
      margin-left: 0;
    }
  }
}
.toggle-opt {
  padding: .3em .6em;
  flex-grow: 1;
  font-size: 1rem;
  cursor: pointer;
  @include flex-center(h);

  & + & {
    // border-top: 1px solid black;

    border-top: none;
    border-left: 1px solid black;
  }

  &.active {
    background: $primary;
    color: white;

    &:nth-child(1) {
      // border-bottom-left-radius: 0px;
      // border-bottom-right-radius: 0px;
      // border-top-right-radius: 9px;
      // border-top-left-radius: 9px;

      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 9px;
      border-top-left-radius: 9px;
    }
    &:nth-last-child(1) {
      // border-bottom-left-radius: 9px;
      // border-bottom-right-radius: 9px;

      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      border-bottom-right-radius: 9px;
      border-top-right-radius: 9px;
    }

    @include tablet-up {
    }
  }
}
</style>
