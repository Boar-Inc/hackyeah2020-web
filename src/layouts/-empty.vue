<template>
  <nuxt />
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://ensembleeducation.org' + this.$route.path
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "~/styles/layouts.scss";
</style>
