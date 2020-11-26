<template>
  <div>
    <BottomNav />
    <Map :points="points" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: []
    }
  },
  async fetch() {
    this.points = await this.$axios.$get('sightings');
  }
}
</script>

<style lang="sass">

</style>
