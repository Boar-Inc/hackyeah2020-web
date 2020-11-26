<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true">
        <vl-view v-if="center" :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" />
        <vl-layer-tile v-if="center">
          <vl-source-osm />
        </vl-layer-tile>

        <!-- <vl-layer-vector v-if="useUrlFunction">
          <vl-source-vector :url="urlFunction" :strategy-factory="loadingStrategyFactory" />
        </vl-layer-vector>
        <vl-layer-vector v-else>
          <vl-source-vector url="https://openlayers.org/en/latest/examples/data/geojson/countries.geojson" projection="EPSG:4326" />
        </vl-layer-vector> -->

        <vl-geoloc @update:position="center = $event">
          <template slot-scope="geoloc">
            <vl-feature v-if="geoloc.position" id="position-feature">
              <vl-geom-point :coordinates="geoloc.position" />
              <vl-style-box>
                <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]" />
              </vl-style-box>
            </vl-feature>
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
    }
  },
  data() {
    return {
      center: null,
      zoom: 13,
      rotation: 0
    }
  }
}
</script>

<style>

</style>
