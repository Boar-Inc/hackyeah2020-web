<template>
  <div class="page-wrap">
    <aside v-if="showMsg" class="msg">
      <h1>Dziękujemy!</h1>
      <h2>Twoje zgłoszenie zostało przyjęte</h2>
      <button @click="showMsg = false">
        <IconLabel icon="bx-check">
          OK
        </IconLabel>
      </button>
    </aside>

    <img v-show="picking" src="marker.png" class="center-marker">
    <nav>
      <div class="wrap">
        <div class="icon-group">
          <IconLabel icon="bx-target-lock" class="icon-btn target-lock" :class="[isCentered && 'active']" @click.native="$emit('recenter')" />
          <div class="layers-btn-wrap">
            <div v-show="openLayersTooltip" class="layers-tooltip">
              <div class="layer-square layer-satellite" :class="[layers.satellite && 'active']" @click="layers.satellite = !layers.satellite" />
              <div class="layer-square layer-heatmap" :class="[layers.heatmap && 'active']" @click="layers.heatmap = !layers.heatmap" />
              <div class="layer-square layer-boars" :class="[layers.boars && 'active']" @click="layers.boars = !layers.boars" />
            </div>
            <IconLabel icon="bxs-layer" class="icon-btn layers-btn" @click.native="openLayersTooltip = !openLayersTooltip" />
          </div>
        </div>

        <div class="button-group">
          <button v-if="!picking" class="sighting" @click="togglePicking">
            <IconLabel icon="bxs-error-circle">
              ZGŁOŚ DZIKA!
            </IconLabel>
          </button>

          <template v-if="picking">
            <button class="cancel" @click="togglePicking">
              <IconLabel icon="bx-x" />
            </button>
            <button class="sighting send" @click="submit">
              <IconLabel icon="bx-send" right>
                ZGŁOŚ
              </IconLabel>
            </button>
          </template>
        </div>
        <!-- <button>

        </button> -->
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    picking: Boolean,
    pos: Array,
    isCentered: Boolean,
    layers: Object
  },
  data() {
    return {
      showMsg: false,
      openLayersTooltip: false
    }
  },
  methods: {
    togglePicking() {
      const val = !this.picking;
      this.$emit('update:picking', val);
    },
    async submit() {
      await this.$axios.$post('sightings', {
        lng: this.pos[0],
        lat: this.pos[1]
      });
      this.$emit('update:picking', false);
      this.showMsg = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.center-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  transform: translateX(-50%) translateY(-100%);
}
.page-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999999;
  pointer-events: none;
}
nav {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
}
.wrap {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  margin: 0 auto;
  flex-direction: column;
  padding: 0 10px;

  @include tablet-up {
    flex-direction: row;
  }
}
button {
  // height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .6em .9em;
  border-radius: 100px;
  background: black;
  color: white;
  margin: 0 10px;
  font-size: 1.5rem;
  font-family: $display-stack;
  font-weight: 600;
  pointer-events: auto;
  i {
    font-size: 1.2em;
    margin-right: 10px;
  }
}
button.sighting {
  flex-grow: 1;
  @include tablet-up {
    flex-basis: 300px;
  }
  background: $primary;
}
button.cancel {
  // align-self: flex-start;
  // margin-bottom: 15px;
  // font-size: 1.1rem;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  flex-shrink: 1;
  margin-right: 5px;
  @include tablet-up {
    // font-size: 1.5rem;
    // margin-bottom: 0;
    // align-self: initial;
    // padding-right: 1.3em;
  }
}
button.send {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 0;
}
.nav-msg-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.msg {
  transform: translateY(-50%);
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50vh;
  display: flex;
  background: $primary;
  color: white;
  flex-direction: column;
  align-items: center;
  border-radius: 35px;
  padding: 20px 10px 10px;
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  h2 {
    margin-bottom: 40px;
  }
  button {
    color: black;
    background: white;
    width: 100%;
  }
}
.target-lock {
  &.active {
    color: $primary;
  }
}
.icon-group > * {
  display: flex;
  font-size: 2.2rem;
  margin-right: 15px;
  cursor: pointer;
  pointer-events: all;
  filter: drop-shadow(0 3px 0px white);
}
.icon-group {
  display: flex;
  margin-bottom: 20px;
  margin-left: 25px;

  @include tablet-up {
    margin: 0;
    margin-right: 10px;
    margin-left: -20px;
  }
}
.button-group {
  display: flex;
  flex-grow: 1;
}
.layers-tooltip {
  position: fixed;
  top: -15px;
  left: 50%;
  transform: translateY(-100%) translateX(-50%);
  background: white;
  border-radius: 500px;
  display: flex;
  flex-direction: column;
  padding: 8px;
}
.layer-square {
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background: white;
  border: 2px solid transparent;
  background-size: contain;
  box-shadow: 0 0 2px black;
  position: relative;

  & + & {
    margin-top: 10px;
  }

  &.active {
    border: 3px solid $primary;
    box-shadow: none;
  }

  &.active:before {
    background: none;
    border: 2px solid #fff;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    pointer-events: none;
  }
}
.layer-heatmap {
  background-image: url('/heatmap.png');
}
.layer-satellite {
  background-image: url('/satellite.png');
}
</style>
