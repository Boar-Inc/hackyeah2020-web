<template>
  <div class="tooltip">
    <div>
      <IconLabel :icon="condition[point.condition].icon">
        {{condition[point.condition].text}}
      </IconLabel>
    </div>
    <div>
      <IconLabel icon="bxs-time">
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
      }
    }
  },
  computed: {
    time() {
      return formatDistanceToNow(new Date(this.point.createdOn), {locale: pl, addSuffix: true})
    }
  },
  methods: {
    polishPlural(singularNominativ, pluralNominativ, pluralGenitive, value) {
      if (value === 1) {
        return singularNominativ;
      } else if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)) {
        return pluralNominativ;
      } else {
        return pluralGenitive;
      }
    }
  }
}
</script>

<style lang="scss">
.tooltip {
  transform: translateX(-50%) translateY(calc(-50% - 110px));
  background: white;
  border-radius: 10px;
  font-size: 1.3rem;
  padding: 15px;
  // height: 500px;
  // display: none;
  & > div + div {
    margin-top: 10px;
  }
}
</style>
