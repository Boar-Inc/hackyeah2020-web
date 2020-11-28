<template>
  <div class="numberinput">
    <IconLabel icon="bx-minus" @click.native="$emit('update:val', val-1)" />
    <div class="val">
      {{val}}
    </div>
    <IconLabel icon="bx-plus" @click.native="$emit('update:val', val+1)" />
  </div>
</template>

<script>
export default {
  props: {
    val: Number
  }
}
</script>

<style lang="scss" scoped>
.numberinput {
  display: flex;
  background: #ddd;
  border-radius: 200px;

  ::v-deep i {
    cursor: pointer;
  }
}
.val {
  margin: 0 3px;
}
</style>
