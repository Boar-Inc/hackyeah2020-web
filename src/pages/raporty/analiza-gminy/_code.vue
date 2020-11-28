<template>
  <div class="padded-wide">
    <div class="bg" />

    <div class="go-back">
      <nuxt-link to="/raporty/analiza-gminy/wyszukaj">
        <IconLabel icon="bxs-chevron-left">
          Wróć
        </IconLabel>
      </nuxt-link>
    </div>

    <h1>Raport</h1>
    <h2>Analiza zgłoszeń w obrębie gminy {{data ? data.name : ''}}</h2>

    <button class="gen-button" @click="download">
      <IconLabel icon="bxs-download" right>
        Pobierz skoroszyt CSV
      </IconLabel>
    </button>

    <!-- <aside class="hint">
      Kliknij
    </aside> -->
    <client-only>
      <table>
        <tr>
          <th>Gmina</th>
          <th>Stan</th>
          <th>Liczba</th>
          <th>Wiek</th>
          <th>Data</th>
          <th>Zdjęcie</th>
        </tr>
        <tr v-for="row in data.sightings" :key="row.id">
          <td>
            {{data.name}} <small>({{data.code}})</small>
          </td>
          <td>
            <IconLabel :icon="condition[row.condition].icon">
              {{condition[row.condition].text}}
            </IconLabel>
          </td>
          <td>
            {{row.amount}} {{polishPlural('dzik', 'dziki', 'dzików', row.amount)}}
          </td>
          <td>
            {{row.age}} {{polishPlural('rok', 'lata', 'lat', row.age)}}
          </td>
          <td>
            {{formatDate(row.createdOn)}}
          </td>
          <td>
            <a v-if="row.imageURL" :href="row.imageURL">
              <IconLabel icon="bx-link-external" />
            </a>
            <IconLabel v-else icon="bx-x" />
          </td>
        </tr>
      </table>
    </client-only>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
export default {
  layout: 'report',
  data() {
    return {
      data: {},
      condition: {
        alive: {text: 'żywe', icon: 'bxs-badge-check'},
        dead: {text: 'padłe', icon: 'bxs-skull'},
        remains: {text: 'szczątki', icon: 'bxs-bone'}
      }
    }
  },
  async fetch() {
    if (!this.$route.params.code) {
      this.$router.replace('/raporty/analiza-gminy/wyszukaj');
    }
    this.data = await this.$axios.$get('report/sightingsWithinGmina?code=' + this.$route.params.code);
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
    },
    async download() {
      const data = await this.$axios.$get(`report/sightingsWithinGmina?code=${this.$route.params.code}&format=csv`);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `raport-${+new Date()}.csv`);
      document.body.appendChild(link);
      link.click();
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
