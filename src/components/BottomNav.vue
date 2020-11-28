<template>
  <div class="page-wrap">
    <aside v-if="msg.show" class="msg" :class="[msg.isError && 'error']">
      <h1>{{msg.msg}}</h1>
      <h2>{{msg.hint}}</h2>
      <button @click="msg.show = false">
        <IconLabel :icon="msg.icon">
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
              <div class="layer-square layer-gminy" :class="[layers.gminy && 'active']" @click="updateLayers({gminy: !layers.gminy})">
                <!-- gminy -->
              </div>
              <div class="layer-square layer-heatmap" :class="[layers.heatmap && 'active']" @click="updateLayers({boars: false, heatmap: true})" />
              <div class="layer-square layer-boars" :class="[layers.boars && 'active']" @click="updateLayers({boars: true, heatmap: false})" />
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

          <div v-if="picking" class="report-wrap">
            <div class="report-opts">
              <div style="margin-bottom: 10px">
                <FileUpload :files.sync="files" />
              </div>
              <div style="display: flex; justify-content: space-around; margin-bottom: 10px; font-size: 1.1rem">
                <div style="display: flex">
                  <p style="margin-right: 5px">
                    Liczba
                  </p>
                  <NumberInput :val.sync="amount" />
                </div>
                <div style="display: flex">
                  <p style="margin-right: 5px">
                    Wiek
                  </p>
                  <NumberInput :val.sync="age" />
                </div>
              </div>
              <Toggle :opts="[{text: 'Żywy', icon: 'bxs-badge-check'}, {text: 'Padły', icon: 'bxs-skull'}, {text: 'Szczątki', icon: 'bxs-bone'}]" :active.sync="condition" />
            </div>
            <button class="cancel" @click="togglePicking">
              <IconLabel icon="bx-x" />
            </button>
            <button class="sighting send" @click="submit">
              <IconLabel icon="bx-send" right>
                ZGŁOŚ
              </IconLabel>
            </button>
          </div>
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
      msg: {
        show: false,
        msg: 'Dziękujemy',
        hint: 'Twoje zgłoszenie zostało przyjęte',
        icon: 'bx-check',
        isError: false,
      },
      openLayersTooltip: false,
      condition: 0,
      files: null,
      age: 5,
      amount: 1
    }
  },
  computed: {
    storedRequests() {
      return this.$store.state.user.requests;
    }
  },
  methods: {
    togglePicking() {
      const val = !this.picking;
      this.$emit('update:picking', val);
    },
    async submit() {
      const formData = new FormData();
      formData.append('lng', this.pos[0]);
      formData.append('lat', this.pos[1]);
      formData.append('condition', ['alive', 'dead', 'remains'][this.condition]);
      formData.append('age', +this.age);
      formData.append('amount', +this.amount);
      if (this.files)
        formData.append('image', this.files[0]);
      if (this.$nuxt.isOnline) {
        let point = null;
        try {
          point = await this.$axios.$post('sightings', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
          });
        } catch (err) {
          const msgs = {
            403: {
              msg: 'Przepraszamy, to niemożliwe.',
              hint: 'Zgłaszanie dzików poza terenem Polski jest niedozwolone!'
            },
            409: {
              msg: 'Duplikat!',
              hint: 'Wygląda na to, że niedawno przyjęliśmy podobne zgłoszenie!'
            }
          }

          this.$emit('update:picking', false);

          if (err.response?.status && err.response.status in msgs) {
            this.msg = {
              show: true,
              isError: true,
              icon: 'bxs-sad',
              ...msgs[err.response.status]
            }
          } else if (err.response?.status) {
            this.msg = {
              show: true,
              isError: true,
              icon: 'bx-check',
              msg: 'Przepraszamy, coś poszło nie tak',
              hint: 'Prosimy spróbować ponownie później'
            }
          } else throw err;
          return;
        }
        this.msg = {
          show: true,
          msg: 'Dziękujemy',
          hint: 'Twoje zgłoszenie zostało przyjęte',
          icon: 'bx-check',
          isError: false,
        };
        this.$emit('submit', point);
        this.$store.commit('user/submitSighting', point.id)
      } else {
        this.msg = {
          show: true,
          msg: 'Tryb offline',
          hint: 'Wyślemy twoje zgłoszenie jak tylko zostanie przywrócona łączność z Internetem',
          icon: 'bx-check',
          isError: false,
        };
        this.$store.commit('user/pushRequest', {
          lng: this.pos[0],
          lat: this.pos[1],
          condition: ['alive', 'dead', 'remains'][this.condition],
          age: +this.age,
          amount: +this.amount,
          image: this.files?.[0]
        })
      }
      this.$emit('update:picking', false);
      this.age = 5;
      this.amount = 1;
      this.condition = 0;
      this.files = null;
    },
    updateLayers(x) {
      this.$emit('update:layers', {...this.layers, ...x})
    }
  },
  watch: {
    '$nuxt.isOnline': {
      async handler(val) {
        if (process.client) {
          if (val) {
            for (const req of this.storedRequests) {
              const formdata = new FormData();
              for (const [k, v] of Object.entries(req)) {
                if (v)
                  formdata.append(k, v);
              }
              try {
                this.$emit('submit', await this.$axios.$post('sightings', formdata, {
                  headers: {'Content-Type': 'multipart/form-data'}
                }));
              } catch (err) { }
            }
            this.$store.commit('user/clearRequests')
          }
        }
      }
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

  @media print {
    display: none;
  }
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
.report-wrap {
  display: flex;
  flex-grow: 1;
  pointer-events: all;
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
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
  }
  button {
    color: black;
    background: white;
    width: 100%;
  }
  &.error {
    background: black;
    button {
      background: white;
    };
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
  @include flex-center(vh);
  padding-top: 20px;
  font-size: 1rem;
  font-family: $display-stack;
  font-weight: 600;
  text-shadow: 1px 1px 2px white;

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

  &:nth-last-child(2), &:nth-last-child(2).active:before {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  &:nth-last-child(1), &:nth-last-child(1).active:before {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
.layer-heatmap {
  background-image: url('/heatmap.png');
}
.layer-satellite {
  background-image: url('/satellite.png');
}
.layer-gminy {
  background-image: url('/gminy.png');
}
.layer-boars {
  background-image: url('/boars.png');
}
.report-wrap {
  position: relative;
}
.report-opts {
  position: absolute;
  background: white;
  border-radius: 15px;
  padding: 10px;
  top: -20px;
  right: 10px;
  left: 10px;
  transform: translateY(-100%);
  border: 2px solid black;
  @include tablet-up {
    top: -25px;
    left: 50%;
    max-width: 400px;
    min-width: 320px;
    transform: translateY(-100%) translateX(-50%);
  }
}
</style>
