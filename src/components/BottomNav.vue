<template>
  <div class="page-wrap">
    <img v-show="picking" src="marker.png" class="center-marker">
    <nav>
      <div class="wrap">
        <!-- <button>

        </button> -->
        <button v-if="!picking" class="sighting" @click="togglePicking">
          <IconLabel icon="bxs-error-circle">
            ZGŁOŚ DZIKA!
          </IconLabel>
        </button>

        <template v-if="picking">
          <button class="cancel" @click="togglePicking">
            <IconLabel icon="bx-x">
              ANULUJ
            </IconLabel>
          </button>
          <button class="sighting" @click="togglePicking">
            <IconLabel icon="bx-send" right>
              ZGŁOŚ
            </IconLabel>
          </button>
        </template>
        <!-- <button>

        </button> -->
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    picking: Boolean
  },
  methods: {
    togglePicking() {
      const val = !this.picking;
      this.$emit('update:picking', val);
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
  pointer-events: auto;
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
  i {
    font-size: 1.2em;
    margin-right: 10px;
  }
}
button.sighting {
  @include tablet-up {
    flex-basis: 300px;
    flex-grow: 1;
  }
}
button.cancel {
  align-self: flex-start;
  margin-bottom: 15px;
  @include tablet-up {
    margin-bottom: 0;
    align-self: initial;
    flex-shrink: 1;
    padding-right: 1.3em;
  }
}
</style>
