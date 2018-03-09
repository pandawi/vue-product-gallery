<template>
  <form class="form-inline">
    <div class="search form-group">
      <label for="search">Search</label>
      <input class="form-control" id="search" v-model="searchQuery" @keyup="search" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>

<style lang="scss">
form {
  justify-content: flex-end;
  margin: 10px 0;
  .search {
    label {
      margin-right: 10px;
    }
  }
}
</style>


