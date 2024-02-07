<script>
import SearchItem from './SearchItem.vue'

export default {
  name: 'SearchResults',
  props: {
    genes: Array
  },
  components: {
    SearchItem,
  }
}
</script>

<template>
  <div class="flex-col gap-1">
    <SearchItem v-for="gene in genes" :identifier="gene.gene" :id="gene.id" />
  </div>
</template>