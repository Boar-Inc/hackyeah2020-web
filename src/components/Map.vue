<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map
        :zoom="16"
        :center="center"
        :options="{zoomControl: false}"
        @ready="onReady"
        @locationfound="onLocationFound"
      >
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <l-circle :lat-lng="center" :radius="14" color="#fff" fill-color="#1a74ed" :fill-opacity="1" />
        <l-circle :lat-lng="center" :radius="15" color="#000" :fill-opacity="0" :weight="1.5" />

        <!-- <l-marker  /> -->
        <l-marker v-for="p in points" :key="p.id" :lat-lng="[p.coordinates.lat, p.coordinates.lng]">
          <l-icon
            :icon-size="[64, 64]"
            :icon-anchor="[32, 32]"
            icon-url="boar.png"
          />
        </l-marker>
      </l-map>
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
      center: [0.99, 0.99],
      clustercomp: null
    }
  },
  async mounted() {
    // this.clustercomp = await import('vue2-leaflet-markercluster');
  },
  methods: {
    onReady(map) {
      map.locate();
    },
    onLocationFound(location) {
      this.center = location.latlng;
    }
  }
}
</script>

<style>

</style>
