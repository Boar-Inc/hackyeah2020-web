<template>
  <div>
    <div class="bg" />
    <Nuxt />
    <div class="overlay">
      <IconLabel icon="bxs-error" class="error-ico" />
      <h1>Uwaga,</h1>
      <h2>Raporty są funkcją administracyjną nieprzeznaczoną dla urządzeń mobilnych.</h2>
      <h2>Prosimy skorzystać z innego urządzenia w celu analizy danych.</h2>
      <div class="go-back">
        <nuxt-link to="/">
          <IconLabel icon="bxs-chevron-left">
            Wróć
          </IconLabel>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/styles/layouts.scss";

.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
.padded {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: content-box;
  padding-bottom: 60px;
}
.padded-wide {
  max-width: 850px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: content-box;
  padding-bottom: 60px;
}
.overlay {
  display: none;
  @media (max-width: 800px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    color: white;
    padding: 10px 20px;
    @include flex-center(v);
    flex-direction: column;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  h2 {
    margin-top: 10px;
    font-size: 1.2rem;
  }

  .error-ico {
    font-size: 9rem;
    margin-top: 50px;
  }

  .go-back {
    font-size: 1.3rem;
    margin-top: 40px;
    background: white;
    color: black;
    font-family: $display-stack;
    font-weight: 600;
    padding: .3em .6em;
    border-radius: 100px;
  }
}
</style>
