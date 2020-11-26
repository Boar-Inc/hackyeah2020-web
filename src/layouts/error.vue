<template>
  <div class="padded-container error">
    <IconLabel icon="bx-error-circle" class="error-icon" />
    <h1>Oops! Something went wrong</h1>
    <a href="/">
      Go Home?
    </a>
  </div>
</template>

<script>
export default {
  layout: 'default',
}
</script>

<style lang="scss" scoped>
.error {
  @include flex-center(v);
  flex-direction: column;
  padding-top: 20vh;
  height: 100vh;
}
.error-icon {
  justify-content: center;
  font-size: 10rem;
  color: #d21b1b;
  margin-bottom: 2rem;
}
a {
  color: $primary;
}
h1 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}
</style>
