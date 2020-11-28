<template>
  <div>
    <BottomNav :picking.sync="picking" :is-centered="isCentered" :pos="center" :layers.sync="layers" @recenter="center = [...geoloc]" />
    <InfoPanel />
    <Map :points="points" :picking="picking" :center.sync="center" :geoloc.sync="geoloc" :layers.sync="layers" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: [],
      picking: false,
      center: [19.615410156250018, 51.82268758254099],
      geoloc: undefined,
      layers: {
        satellite: false,
        heatmap: true,
        boars: false,
        gminy: false
      }
    }
  },
  async fetch() {
    this.points = await this.$axios.$get('sightings');
  },
  computed: {
    isCentered() {
      if (!this.geoloc) return false;
      return (Math.abs(this.center[0] - this.geoloc[0]) < 0.001) && (Math.abs(this.center[1] - this.geoloc[1]) < 0.001);
    }
  }
}
</script>

<style lang="sass">

</style>
