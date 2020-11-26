<template>
  <div>
    <!-- <nav-bar v-bind="navbar" /> -->
    <Nuxt />
    <!-- <foot v-if="this.$route.name === 'index'" />
    <PortalTarget name="popup" multiple /> -->
  </div>
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
  },
  computed: {
    navbar() {
      return ({
        index: {
          shadow: 'always',
          scrolled: 'never'
        }
      })[this.$route.name] || {
        shadow: 'scrolled'
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/styles/layouts.scss";
</style>
