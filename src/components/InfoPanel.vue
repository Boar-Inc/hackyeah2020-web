<template>
  <div class="panel" :class="[open && 'open']">
    <div class="corner" @click="open = !open">
      <IconLabel :icon="open ? 'bx-x' : 'bxs-info-circle'" />
    </div>
    <div class="submit-count">
      <IconLabel icon="bxs-star">
        Liczba twoich zgłoszeń: {{submitCount}}<br>
        <template v-if="submitCount > 0">
          Dziękujemy!
        </template>
      </IconLabel>
    </div>
    <div class="text">
      <h1>Czym jest ASF?</h1>
      <p>Afrykański pomór świń (African Swine Fever - ASF) to szybko szerząca się, zakaźna choroba wirusowa, na którą podatne są świnie domowe , świniodziki oraz dziki. W przypadku wystąpienia ASF w stadzie dochodzi do dużych spadków w produkcji: zakażenie przebiega powoli i obejmuje znaczny odsetek zwierząt w stadzie, przy czym śmiertelność zwierząt sięga nawet 100%. Okres inkubacji choroby wynosi 15 dni.</p>
      <p>Wirus jest wyjątkowo odporny na działanie niskich temperatur i zachowuje właściwości zakaźne we krwi, kale, tkankach (zwłaszcza surowych, niedogotowanych produktów z mięsa wieprzowego lub dzików) przez okres nawet 3-6 miesięcy.</p>
      <h1>Czy ASF jest niebezpieczny dla ludzi?</h1>
      <p>Ludzie nie są wrażliwi na zakażenie wirusem ASF, w związku z czym choroba ta nie stwarza zagrożenia dla ich zdrowia lub życia.</p>
      <h1>Drogi zakażenia</h1>
      <p>Najczęstszym sposobem zakażenia zwierząt jest bezpośredni lub pośredni kontakt ze zwierzętami zakażonymi. Rozprzestrzenianie się wirusa jest stosunkowo łatwe za pośrednictwem osób i pojazdów odwiedzających gospodarstwo, skażonego sprzętu i narzędzi, zwierząt mających swobodny dostęp do gospodarstwa (gryzonie, koty, psy), jak również przez skażoną paszę, wodę oraz skarmianie zwierząt odpadami kuchennymi (zlewkami) zawierającymi nieprzetworzone mięso zakażonych świń lub dzików.</p>
      <h1>Co zrobić w przypadku znalezienia padłego dzika?</h1>
      <p>Wirus ASF może przez długi czas utrzymywać się w zwłokach padłych dzików, dlatego powinny być one usuwane ze środowiska. Jak postępować po znalezieniu padłego dzika?</p>
      <ol>
        <li>Oznakować miejsce znalezienia zwłok dzika.</li>
        <li>Powstrzymać się od dotykania zwłok dzika.</li>
        <li>Zgłosić fakt znalezienia padłego dzika do miejscowego powiatowego lekarza weterynarii.</li>
      </ol>
      <h1>Jak zachować się w lesie?</h1>
      <p>W związku z zagrożeniem ASF należy pamiętać, że w lesie: </p>
      <ul>
        <li>Nie wolno pozostawiać żadnych odpadków żywnościowych</li>
        <li>Należy powstrzymać się od wywoływania hałasu, który powoduje płoszenie dzików (w tym używania sprzętów lub pojazdów powodujących hałas)</li>
        <li>Nie należy spuszczać psów ze smyczy.</li>
      </ul>
      <h1>Zakaźliwość</h1>
      <p>Śmierć dzika nie oznacza, że zwłoki nie mogą stanowić źródła zakażenia dla innych dzików</p>
      <p>Wirus jest bardzo odporny na działanie czynników środowiskowych (np. temperatury). Podczas pory zimowej szczątki dzika mogą pozostawać zakaźne przez 4 miesiące</p>
      <p>w ziemi zanieczyszczonej krwią zawierającą wirus ASFV może on przeżyć nawet przez kilka miesięcy (w zimie znacznie dłużej niż w lecie)</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  computed: {
    submitCount() {
      return this.$store.state.user.sightings.length
    }
  }
}
</script>

<style lang="scss" scoped>
.corner {
  position: sticky;
  top: 13px;
  padding-right: 13px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  font-family: $display-stack;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
}
.panel {
  @media print {
    display: none;
  }
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  max-width: 550px;
  background: black;
  color: white;
  z-index: 9999999999999999;
  clip-path: circle(50px at calc(100% - 22px) calc(0% + 20px));
  transition: .4s all ease-in-out;
  padding-bottom: 50px;

  &.open {
    clip-path: circle(150% at 100% 0%);
    transition: .4s all ease-in-out;
    overflow: auto;
  }
}
.text {
  margin: 0 auto;
  margin-top: 40px;
  max-width: 600px;
  padding: 0 30px;

  @include tablet-up {
    padding: 0 40px;
  }
}
h1 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 600;
  margin-top: 40px;
}
p + p, ol, ul {
  margin-top: 10px;
}
ol li {
  list-style: decimal;
}
ul li {
  list-style: disc;
}
.submit-count {
  padding: 15px 20px;
  color: black;
  background: white;
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 1.3rem;
  border-radius: 3px;
}
</style>
