<template>
  <nav>
    <div class="wrap">
      <!-- <button>

      </button> -->
      <button class="sighting">
        <IconLabel icon="bxs-error-circle">
          THERE'S A BOAR!
        </IconLabel>
      </button>
      <!-- <button>

      </button> -->
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  z-index: 9999999999;
}
.wrap {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  margin: 0 auto;
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
}
button.sighting {
  flex-basis: 300px;
  flex-grow: 1;
  margin: 0 20px;
  font-size: 1.5rem;
  font-family: $display-stack;
  font-weight: 600;

  i {
    font-size: 1.2em;
    margin-right: 10px;
  }
}
</style>
