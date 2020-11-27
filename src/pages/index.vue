<template>
  <div>
    <BottomNav :picking.sync="picking" :is-centered="isCentered" :pos="center" @recenter="center = [...geoloc]" />
    <InfoPanel />
    <Map :points="points" :picking="picking" :center.sync="center" :geoloc.sync="geoloc" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: [],
      picking: false,
      center: [2159833.468576233, 6786155.512946144],
      geoloc: undefined,
    }
  },
  async fetch() {
    this.points = await this.$axios.$get('sightings');
  },
  computed: {
    isCentered() {
      console.log(JSON.stringify(this.center) === JSON.stringify(this.geoloc));
      return JSON.stringify(this.center) === JSON.stringify(this.geoloc);
    }
  }
}
</script>

<style lang="sass">

</style>
