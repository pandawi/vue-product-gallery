<template>
    <main class="container-fluid">
        <Form />
        <Table />
        <Products />
    </main>
</template>

<script>
import Form from '../components/Form'
import Table from '../components/Table'
import Products from '../components/Products'

export default {
  components: {
    Form,
    Table,
    Products
  }
}
</script>

<style scoped lang="scss">
main {
  display: flex;
}
</style>

