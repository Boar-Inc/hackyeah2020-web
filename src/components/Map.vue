<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true">
        <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation" />
        <vl-layer-tile>
          <vl-source-osm />
        </vl-layer-tile>

        <!-- <vl-layer-vector v-if="useUrlFunction">
          <vl-source-vector :url="urlFunction" :strategy-factory="loadingStrategyFactory" />
        </vl-layer-vector>
        <vl-layer-vector v-else>
          <vl-source-vector url="https://openlayers.org/en/latest/examples/data/geojson/countries.geojson" projection="EPSG:4326" />
        </vl-layer-vector> -->

        <vl-geoloc @update:position="() => {}">
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
      center: [2159833.468576233, 6786155.512946144],
      zoom: 7,
      rotation: 0
    }
  },
  methods: {
    onResize() {
      if (JSON.stringify(this.center) === JSON.stringify([2159833.468576233, 6786155.512946144]))
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
