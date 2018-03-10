<template>
  <section>
    <Search @search="search" />
    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="setCurrentSort('siteID')">Site Id <icon scale="0.7" :name="sortIcon" v-if="currentSort.prop === 'siteID'" /></th>
          <th @click="setCurrentSort('catalogId')">Catalog Id <icon scale="0.7" :name="sortIcon" v-if="currentSort.prop === 'catalogId'" /></th>
          <th @click="setCurrentSort('catalogName')">Catalog Name <icon scale="0.7" :name="sortIcon" v-if="currentSort.prop === 'catalogName'" /></th>
          <th @click="setCurrentSort('categoryId')">Category Id <icon scale="0.7" :name="sortIcon" v-if="currentSort.prop === 'categoryId'" /></th>
          <th @click="setCurrentSort('categoryName')">Category Name <icon scale="0.7" :name="sortIcon" v-if="currentSort.prop === 'categoryName'" /></th>
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
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chevron-up'
import 'vue-awesome/icons/chevron-down'

export default {
  components: {
    Search,
    Icon
  },
  data() {
    return {
      currentSort: { prop: 'catalogId', type: 0 },
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
    },
    sortIcon() {
      return this.currentSort.type ? 'chevron-up' : 'chevron-down'
    }
  },
  methods: {
    setCurrentSort(value) {
      if (value === this.currentSort.prop) {
        this.currentSort.type = !this.currentSort.type
      } else {
        this.currentSort.type = 0
      }
      this.currentSort.prop = value
      this.$store.dispatch('setSort', {
        property: this.currentSort.prop,
        order: this.currentSort.type ? 'ASC' : 'DESC'
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
