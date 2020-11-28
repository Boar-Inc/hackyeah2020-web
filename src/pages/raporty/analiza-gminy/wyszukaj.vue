<template>
  <div class="padded">
    <div class="bg" />

    <div class="go-back">
      <nuxt-link to="/raporty">
        <IconLabel icon="bxs-chevron-left">
          Wróć
        </IconLabel>
      </nuxt-link>
    </div>

    <h1>Raport</h1>
    <h2>Analiza występowania dzików w obrębie jednej gminy.</h2>
    <h2>Wyszukaj gminę (nazwa lub kod terytorialny), aby kontynuować.</h2>

    <div class="search-bar-wrap">
      <IconLabel icon="bx-search-alt bx-flip-horizontal" />
      <input v-model="q" type="text" class="search-bar">
    </div>

    <ul v-if="results.length">
      <li v-for="row in results.slice(0,30)" :key="row.id">
        <div>
          {{row.name}} <small>({{row.code}})</small>
        </div>
        <nuxt-link :to="'/raporty/analiza-gminy/' + row.code">
          <IconLabel icon="bxs-right-arrow-alt" right>
            Generuj
          </IconLabel>
        </nuxt-link>
      </li>
    </ul>
    <aside v-if="results.length > 30">
      ... oraz {{results.length - 30}} innych wyników.
    </aside>
    <aside v-if="!results.length">
      Wprowadź nazwę lub kod terytorialny gminy, aby zobaczyć wyniki.
    </aside>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
export default {
  layout: 'report',
  data() {
    return {
      q: '',
      results: [],
      gminy: [],
      condition: {
        alive: {text: 'żywe', icon: 'bxs-badge-check'},
        dead: {text: 'padłe', icon: 'bxs-skull'},
        remains: {text: 'szczątki', icon: 'bxs-bone'}
      }
    }
  },
  async mounted() {
    this.gminy = await (await fetch('/indexgmin.json')).json();
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
    },
    formatDate(x) {
      return format(new Date(x), 'dd.MM.yyyy', {locale: pl})
    }
  },
  watch: {
    q: {
      handler(n) {
        const val = n.trim();
        if (!val.length) {
          this.results = [];
          return;
        }

        this.results = this.gminy.filter(({code, name}) => {
          const n = name.toLowerCase();
          return ~code.indexOf(val) || ~n.indexOf(val)
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar-wrap {
  width: m#{i}n(100%, 400px);
  // margin: 0 auto;
  margin-top: 30px;
  background: #f3f3f3;
  padding: .3em .6em;
  border-radius: 100px;
  border: 2px solid #ccc;
  font-size: 1.5rem;
  @include flex-center(v);

  margin-left: 0;
  margin-right: 0;
  @media (min-width: 1060px) {
    margin-left: -20px;
    margin-right: -20px;
    width: m#{i}n(calc(100% + 40px), 400px);
  }
}
.search-bar {
  margin-left: 10px;
}
h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 20px 0 10px;
}
h2 {
  margin-bottom: 10px;
  font-size: 1.4rem;
}
ul {
  margin-top: 20px;
  li {
    @include flex-center(v);
    font-size: 1.1rem;

    padding: .8em 0;

    & > *:nth-child(1) {
      flex-grow: 1
    }
  }
  li + li {
    border-top: 1px solid #ccc;
  }
}
.gen-button {
  margin-bottom: 30px;
  margin-left: -8px;
}
ul a, .gen-button {
  background: $primary;
  color: white;
  padding: .3rem .6rem;
  border-radius: 100px;
}
.go-back {
  font-size: 1.1rem;
  font-family: $display-stack;
  margin-top: 80px;
  color: $primary;
  font-weight: 600;
}
table {
  margin: 0 -40px;
}
table tr {
  td, th {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    &:nth-child(1) {
      width: 99%;
      // padding-left: 0;
    }
    &:nth-last-child(1) {
      padding-right: 40px;
    }
    white-space: nowrap;
  }
  &:nth-child(even) {
    background: #f5f5f5;
  }
}
small {
  font-size: .8em;
}
aside {
  font-style: italic;
  margin-top: 30px;
}
</style>
