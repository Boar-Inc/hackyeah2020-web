<template>
  <div class="padded">
    <div class="bg" />

    <div class="go-back">
      <nuxt-link to="/">
        <IconLabel icon="bxs-chevron-left">
          Wróć
        </IconLabel>
      </nuxt-link>
    </div>

    <h1>Raporty</h1>
    <h2>Z łatwością dokonaj analizy zgłoszeń i występowania dzików w Polsce.</h2>
    <ul>
      <li>
        <div>
          Zestawienie zgłoszeń w każdej gminie
        </div>
        <nuxt-link to="/raporty/zestawienie-gmin">
          <IconLabel icon="bxs-right-arrow-alt" right>
            Generuj
          </IconLabel>
        </nuxt-link>
      </li>
      <li>
        <div>
          Analiza zgłoszeń w obrębie jednej gminy
        </div>
        <nuxt-link to="/raporty/analiza-gminy/wyszukaj">
          <IconLabel icon="bxs-right-arrow-alt" right>
            Generuj
          </IconLabel>
        </nuxt-link>
      </li>
      <li>
        <div>
          Lista wszystkich zgłoszeń, wraz z podziałami administracyjnymi
        </div>
        <nuxt-link to="/raporty/wszystkie">
          <IconLabel icon="bxs-right-arrow-alt" right>
            Generuj
          </IconLabel>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'report'
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 20px 0 10px;
}
h2 {
  margin-bottom: 30px;
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
ul a {
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
</style>
