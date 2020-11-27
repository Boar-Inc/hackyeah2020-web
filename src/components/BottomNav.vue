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
        <IconLabel icon="bx-target-lock" class="target-lock" :class="[isCentered && 'active']" @click.native="$emit('recenter')" />

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
            <button class="sighting send" @click="togglePicking">
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
    isCentered: Boolean
  },
  data() {
    return {
      showMsg: false
    }
  },
  methods: {
    togglePicking() {
      const val = !this.picking;
      this.$emit('update:picking', val);
    },
    submit() {
      this.$axios.$post('')
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
  font-size: 2.2rem;
  margin-right: 10px;
  cursor: pointer;
  pointer-events: all;
  margin-bottom: 20px;
  margin-left: 25px;
  filter: drop-shadow(0 1px .5px rgba(0, 0, 0, .7));

  @include tablet-up {
    margin: 0;
    margin-right: 10px;
    margin-left: -20px;
  }

  &.active {
    color: $primary;
  }
}
.button-group {
  display: flex;
  flex-grow: 1;
}
</style>
