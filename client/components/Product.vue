<template>
  <article>
    <h2>{{ product.title }}</h2>
    <p>{{ product.id }}</p>
    <img :src="product.image" />
  </article>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  }
}
</script>

