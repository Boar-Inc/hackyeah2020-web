<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" :controls="false" data-projection="EPSG:4326">
        <vl-view :zoom.sync="zoom" :center="center" :rotation.sync="rotation" @update:center="x => $emit('update:center', x)" />
        <vl-layer-tile>
          <vl-source-osm />
        </vl-layer-tile>

        <vl-layer-heatmap v-if="layers.heatmap" :radius="30">
          <vl-source-vector :features="points.map(x => ({geometry: {coordinates: x.location.coordinates, type: 'Point'}, type: 'Feature', id: x.id}))" />
        </vl-layer-heatmap>

        <!-- <vl-layer-vector>
          <vl-source-cluster>
            <vl-source-vector :features="points.map(x => ({geometry: {coordinates: x.location.coordinates, type: 'Point'}, type: 'Feature', id: x.id}))" />
          </vl-source-cluster>
        </vl-layer-vector> -->

        <template v-if="layers.boars">
          <MapPoint v-for="p in points" :key="p.id" :pos="[p.location.coordinates[0], p.location.coordinates[1]]" src="boar.png" :scale=".1" />
        </template>

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
      type: Array
    },
    geoloc: null,
    layers: Object
  },
  data() {
    return {
      zoom: 7,
      rotation: 0,
      geo: [
        {
          type: 'Feature',
          id: 1,
          geometry: {
            type: 'Point',
            coordinates: [19.615410156250018, 51.82268758254099],
          },
        },
        {
          type: 'Feature',
          id: 2,
          geometry: {
            type: 'Point',
            coordinates: [2159833.468576233, 6586155.512946144],
          },
        },
        {
          type: 'Feature',
          id: 3,
          geometry: {
            type: 'Point',
            coordinates: [2159833.468576233, 6586155.512946144],
          },
        },
        {
          type: 'Feature',
          id: 3,
          geometry: {
            type: 'Point',
            coordinates: [2159833.468576233, 6586155.512946144],
          },
        }
      ]
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
    },
  },
  mounted () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    console.log(this.points.map(x => ({geometry: {coordinates: x.location.coordinates, type: 'Point'}, type: 'Feature', id: x.id})))
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
}
</script>

<style>

</style>
