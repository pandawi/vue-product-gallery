<template>
  <form id="site-form" @submit.prevent="submit">
    <div class="form-group">
      <label for="siteId">Site ID:</label>
      <select class="form-control" id="siteId" v-model="siteId" required>
        <option value="0">0</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="16">16</option>
        <option value="77">77</option>
      </select>
    </div>

    <div class="form-group">
      <label for="catalogId">Catalog ID:</label>
      <input class="form-control" type="number" name="catalogId" id="catalogId" v-model="catalogId" required>
    </div>
    
    <button type="submit" class="btn btn-outline-primary">Fetch</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      siteId: null,
      catalogId: null
    }
  },
  methods: {
    submit() {
      if (this.siteId && this.catalogId) {
        this.$store.dispatch('setCatalogs', {
          catalogId: this.catalogId,
          siteId: this.siteId
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
form {
    flex: 1;
    margin-top: 40px;
}
</style>

