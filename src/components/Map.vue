<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" :controls="false">
        <vl-view :zoom.sync="zoom" :center="center" :rotation.sync="rotation" @update:center="x => $emit('update:center', x)" />
        <vl-layer-tile>
          <vl-source-osm />
        </vl-layer-tile>

        <!-- <vl-layer-vector v-if="useUrlFunction">
          <vl-source-vector :url="urlFunction" :strategy-factory="loadingStrategyFactory" />
        </vl-layer-vector>
        <vl-layer-vector v-else>
          <vl-source-vector url="https://openlayers.org/en/latest/examples/data/geojson/countries.geojson" projection="EPSG:4326" />
        </vl-layer-vector> -->

        <MapPoint v-for="p in points" :key="p" :pos="[p.coordinates.lng, p.coordinates.lat]" src="boar.png" :scale=".08" />

        <vl-geoloc @update:position="x => {if (!geoloc) $emit('update:center', x); $emit('update:geoloc', x); zoom = 13}">
          <template slot-scope="loc">
            <MapPoint :pos="loc.position" src="geoloc.png" :scale=".5" />
          </template>
        </vl-geoloc>
      </vl-map>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    points: {
      type: Array,
      default: () => []
    },
    picking: Boolean,
    center: {
      type: Array,
      default: () => [2159833.468576233, 6786155.512946144]
    },
    geoloc: null
  },
  data() {
    return {
      zoom: 7,
      rotation: 0
    }
  },
  methods: {
    onResize() {
      if (!this.geoloc)
        if (window.innerWidth > 950) {
          this.zoom = 7;
        } else if (window.innerWidth > 850) {
          this.zoom = 6.75;
        } else if (window.innerWidth > 750) {
          this.zoom = 6.5;
        } else if (window.innerWidth > 650) {
          this.zoom = 6.25;
        } else if (window.innerWidth > 550) {
          this.zoom = 6;
        } else if (window.innerWidth > 450) {
          this.zoom = 5.75;
        } else if (window.innerWidth > 350) {
          this.zoom = 5.5;
        } else {
          this.zoom = 5.1;
        }
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
}
</script>

<style>

</style>
