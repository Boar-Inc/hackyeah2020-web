<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <vl-map
        ref="map"
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        :controls="false"
        :style="{cursor: mapCursor}"
        data-projection="EPSG:4326"
        @pointermove="onMapPointerMove"
        @click="onMapClick"
      >
        <vl-view :zoom.sync="zoom" :center="center" :rotation.sync="rotation" @update:center="x => $emit('update:center', x)" />
        <vl-layer-tile>
          <vl-source-osm />
        </vl-layer-tile>

        <vl-layer-vector v-if="layers.gminy && gminy" render-mode="image" :declutter="true" :update-while-interacting="true">
          <vl-source-vector :features="gminy" />
        </vl-layer-vector>

        <vl-layer-heatmap v-if="layers.heatmap" :radius="10">
          <vl-source-vector :features="points.map(x => ({geometry: {coordinates: x.location.coordinates, type: 'Point'}, type: 'Feature', id: x.id}))" />
        </vl-layer-heatmap>

        <!-- tooltip -->
        <vl-overlay v-if="tooltip.position" :position="tooltip.position" style="height: 0">
          <Tooltip v-if="tooltip.point" :point="tooltip.point" />
        </vl-overlay>

        <!-- <vl-layer-vector>
          <vl-source-cluster>
            <vl-source-vector :features="points.map(x => ({geometry: {coordinates: x.location.coordinates, type: 'Point'}, type: 'Feature', id: x.id}))" />
          </vl-source-cluster>
        </vl-layer-vector> -->

        <template v-if="layers.boars">
          <MapPoint v-for="p in points" :key="p.id" :pos="[p.location.coordinates[0], p.location.coordinates[1]]" :src="`pin-${p.condition}.png`" :scale="0.85" />
        </template>

        <vl-geoloc @update:position="onGeoLoc">
          <template slot-scope="loc">
            <MapPoint :pos="loc.position" src="geoloc.png" :scale=".5" />
          </template>
        </vl-geoloc>
      </vl-map>
    </client-only>
  </div>
</template>

<script>
// import * as ol from 'ol';

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
      gminy: null,
      tooltip: {
        position: null,
        point: null
      },
      tooltipFix: false,
      mapCursor: 'default',
      geo: [
        {
          type: 'Feature',
          id: 1,
          geometry: {
            type: 'Point',
            coordinates: [19.615410156250018, 51.82268758254099],
          }
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
    onGeoLoc(x) {
      if (!this.geoloc) this.$emit('update:center', x);
      this.$emit('update:geoloc', x);
      this.zoom = 13;
    },
    async getGminy() {
      if (!this.gminy)
        this.gminy = (await (await fetch('/gminy.json')).json()).geometry.map(x => ({type: 'Feature', geometry: x}));
    },
    onMapPointerMove({pixel}) {
      const hitFeature = this.$refs.map.forEachFeatureAtPixel(pixel, feature => feature);

      const id = hitFeature?.values_?.geometry?.values_?.id;
      if (hitFeature && id) {
        this.mapCursor = 'pointer';
      } else {
        this.mapCursor = 'default'
      }
    },
    onMapClick({pixel}) {
      const hitFeature = this.$refs.map.forEachFeatureAtPixel(pixel, feature => feature);

      if (hitFeature) {
        const id = hitFeature.values_?.geometry?.values_?.id;
        if (!id) {
          this.mapCursor = 'default';
          this.tooltip.position = null;
          this.tooltip.point = null;
          return;
        }
        const map = this.$refs.map;
        this.mapCursor = 'pointer'
        this.tooltip.position = window.ol.proj.transform(hitFeature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
        if (!this.tooltipFix)
          setTimeout(() => {
            this.tooltip.point = this.points.find(x => x.id);
            this.tooltipFix = true;
          }, 200);
        else (this.tooltip.point = this.points.find(x => x.id));
        // this.currentName = hitFeature.get('name')
      } else {
        this.mapCursor = 'default'
        this.tooltip.position = null;
        this.tooltip.point = null;
      }
    }
  },
  watch: {
    'layers.gminy': {
      handler(n) {
        if (n) this.getGminy()
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    // setTimeout(() => {
    //   this.tooltip.position = this.center;
    //   this.tooltip.point = {
    //     condition: 'alive'
    //   }
    //   this.tooltipFix = true;
    // }, 1000);
    // console.log(this.points.map(x => ({geometry: {coordinates: x.location.coordinates, type: 'Point'}, type: 'Feature', id: x.id})))
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
}
</script>

<style>

</style>
