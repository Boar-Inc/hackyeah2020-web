<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" />
        <vl-layer-tile v-if="center">
          <vl-source-osm />
        </vl-layer-tile>

        <vl-layer-heatmap :radius="10">
          <vl-source-vector :features.sync="geo" />
        </vl-layer-heatmap>

        <vl-layer-vector>
          <vl-source-cluster>
            <vl-source-vector :features.sync="geo" />
          </vl-source-cluster>
        </vl-layer-vector>

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

  },
  data() {
    return {
      center: [19.9450, 50.0647],
      zoom: 7,
      rotation: 0,
      geo: [{
        type: 'Feature',
        id: 1,
        geometry: {
          type: 'Point',
          coordinates: [2159833.468576233, 6786155.512946144],
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
  }
}
</script>

<style>

</style>
