<template>
  <div>
    <BottomNav
      :picking.sync="picking"
      :is-centered="isCentered"
      :pos="center"
      :layers.sync="layers"
      :gminyloading="gminyLoading"
      @recenter="center = [...geoloc]"
      @submit="x => points = [...points, x]"
    />
    <nuxt-link to="/raporty" class="raports-btn">
      <IconLabel icon="bx-clipboard">
        Raporty
      </IconLabel>
    </nuxt-link>
    <InfoPanel />
    <Map
      :points.sync="points"
      :picking="picking"
      :center.sync="center"
      :geoloc.sync="geoloc"
      :layers.sync="layers"
      :gminyloading.sync="gminyLoading"
    />
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
      },
      gminyLoading: false
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

<style lang="scss" scoped>
.raports-btn {
  position: fixed;
  right: 100px;
  top: 10px;
  z-index: 999999999;
  background: black;
  border-radius: 100px;
  font-size: 1.2rem;
  font-family: $display-stack;
  color: white;
  padding: .4em .8em;
   @media print {
     display: none;
   }
}
</style>
