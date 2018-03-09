<template>
  <section>
      <Product :product="product" v-for="(product, index) in products" :key="index" />
  </section>
</template>

<script>
import Product from './Product'

export default {
  components: {
      Product
  },
  computed: {
    products() {
        return this.$store.state.products
    }
  }
};
</script>

<style scoped lang="scss">
section {
  flex: 2;
}
</style>
