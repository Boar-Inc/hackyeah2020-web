<template>
  <div>
    <BottomNav :picking.sync="picking" />
    <InfoPanel />
    <Map :points="points" :picking="picking" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: [],
      picking: false
    }
  },
  async fetch() {
    this.points = await this.$axios.$get('sightings');
  }
}
</script>

<style lang="sass">

</style>
