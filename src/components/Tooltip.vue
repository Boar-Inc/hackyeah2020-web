<template>
  <div v-show="!isRemoved" class="tooltip" :style="{'--remove-height': canRemove ? '60px' : '0px'}">
    <div v-if="point.imageURL" class="image" :style="{'--url': `url('/uploads/${point.imageURL}')`}" />
    <div>
      <IconLabel :icon="condition[point.condition].icon">
        {{condition[point.condition].text}}
      </IconLabel>
    </div>
    <div>
      <IconLabel icon="bxs-calendar">
        {{point.age}} {{point.age==1 ? 'rok' : ([2, 3, 4].includes(point.age) ? 'lata' : 'lat')}}
      </IconLabel>
    </div>
    <div>
      <IconLabel icon="bxs-category-alt">
        {{point.amount}} {{polishPlural('dzik', 'dziki', 'dzików', point.amount)}}
      </IconLabel>
    </div>
    <div>
      <IconLabel icon="bxs-timer">
        {{time}}
      </IconLabel>
    </div>
    <button
      v-if="!removeInProgress && canRemove"
      class="remove-btn"
      @click="() => {
        removeInProgress = true;
        $nextTick(() => {
          $refs.removeinput.focus();
        });
      }"
    >
      <IconLabel icon="bxs-trash">
        Usuń
      </IconLabel>
    </button>
    <div v-else-if="canRemove" class="remove-in-progress">
      <input ref="removeinput" class="remove-input" placeholder="Powód usunięcia...">
      <button class="remove-submit" @click="remove">
        <IconLabel icon="bxs-trash" />
      </button>
    </div>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import { pl } from 'date-fns/locale'
export default {
  props: {
    point: Object
  },
  data() {
    return {
      condition: {
        alive: {text: 'żywe', icon: 'bxs-badge-check'},
        dead: {text: 'padłe', icon: 'bxs-skull'},
        remains: {text: 'szczątki', icon: 'bxs-bone'}
      },
      removeInProgress: false,
      removeReason: '',
      canRemove: false,
      isRemoved: false
    }
  },
  computed: {
    time() {
      return formatDistanceToNow(new Date(this.point.createdOn), {locale: pl, addSuffix: true})
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.isRemoved = false;
      this.canRemove = this.$store.state.user.sightings.includes(this.point.id);
      this.removeInProgress = false;
      this.removeReason = '';
    },
    polishPlural(singularNominativ, pluralNominativ, pluralGenitive, value) {
      if (value === 1) {
        return singularNominativ;
      } else if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)) {
        return pluralNominativ;
      } else {
        return pluralGenitive;
      }
    },
    async remove() {
      await this.$axios.$post('/deleteSighting', {
        id: this.point.id
      });
      this.isRemoved = true;
      this.$emit('remove', this.point.id);
      this.$store.commit('user/removeSighting', this.point.id);
    }
  },
  watch: {
    'point.id': {
      handler(n) {
        this.refresh();
      }
    }
  }
}
</script>

<style lang="scss">
.tooltip {
  transform: translateX(-50%) translateY(calc(-100% + -60px));
  background: white;
  border-radius: 10px;
  font-size: 1.3rem;
  padding: 15px;
  min-width: 250px;
  white-space: nowrap;
  // height: 500px;
  // display: none;
  filter: drop-shadow(0px 2px 1px rgba(0, 0, 0, .3));
  & > div + div {
    margin-top: 10px;
  }
  &:before{
    content:'';
    display:block;
    width:0;
    height:0;
    position:absolute;

    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
    left: 50%;
    transform: translateX(-50%) translateY(100%);

    bottom: 0;
  }
}
.remove-btn {
  width: 100%;
  border-radius: 5px;
  background: $primary;
  @include flex-center(h);
  margin-top: 15px;
  padding: 10px;
  color: white;
  // height: 30px;

  & > * {
    margin-left: -7px;
  }
}
.remove-input {
  padding: 10px;
  background: #ddd;
  width: 50px;
  flex-grow: 1;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 1.1rem;
}
.remove-in-progress {
  display: flex;
  align-items: stretch;
  height: 44px;
  margin-top: 15px!important;
}
.remove-submit {
  background: $primary;
  color: white;
  padding: 0 10px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
.image {
  height: 150px;
  border-radius: 5px;
  background-image: var(--url);
  background-size: cover;
  background-position: center;
}
</style>
