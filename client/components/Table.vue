<template>
  <section>
    <Search @search="search" />
    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="setCurrentSort('siteID')">Site Id</th>
          <th @click="setCurrentSort('catalogId')">Catalog Id</th>
          <th @click="setCurrentSort('catalogName')">Catalog Name</th>
          <th @click="setCurrentSort('categoryId')">Category Id</th>
          <th @click="setCurrentSort('categoryName')">Category Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(catalog, index) in catalogs" :key="index" @click="fetchProducts(catalog)">
          <td v-html="$options.filters.highlight(catalog.siteID, searchQuery)"></td>
          <td v-html="$options.filters.highlight(catalog.catalogId, searchQuery)"></td>
          <td v-html="$options.filters.highlight(catalog.catalogName, searchQuery)"></td>
          <td v-html="$options.filters.highlight(catalog.categoryId, searchQuery)"></td>
          <td v-html="$options.filters.highlight(catalog.categoryId, searchQuery)"></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import Search from './Search'
export default {
  components: {
    Search
  },
  data() {
    return {
      currentSort: 'catalogId',
      currentType: 'ASC',
      types: ['DESC', 'ASC'],
      searchQuery: ''
    }
  },
  computed: {
    catalogs() {
      return this.searchQuery
        ? this.$store.state.catalogs.filter(
            catalog =>
              catalog.siteID.toString().includes(this.searchQuery) ||
              catalog.catalogId.toString().includes(this.searchQuery) ||
              catalog.catalogName.toString().includes(this.searchQuery) ||
              catalog.categoryId.toString().includes(this.searchQuery) ||
              catalog.categoryName.toString().includes(this.searchQuery)
          )
        : this.$store.state.catalogs
    }
  },
  methods: {
    setCurrentSort(value) {
      let currentType = this.types.indexOf(this.currentType)
      if (value === this.currentSort) {
        this.currentType = this.types[Number(!currentType)]
      } else {
        this.currentType = 'DESC'
      }
      this.currentSort = value
      this.$store.dispatch('setSort', {
        property: this.currentSort,
        order: this.currentType
      })
    },
    search(query) {
      this.searchQuery = query
    },
    fetchProducts(catalog) {
      this.$store.dispatch('fetchProducs', catalog)
    }
  },
  filters: {
    highlight(val, query) {
      return query ? val.toString().replace(query, `<strong>${query}</strong>`) : val
    }
  }
}
</script>

<style scoped lang="scss">
section {
  flex: 3;
  margin: 0 20px;
}
</style>
