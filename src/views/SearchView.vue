<script>
import { toRaw } from 'vue'
import SearchResults from '../components/SearchResults.vue'

export default {
  name: 'SearchView',
  data() {
    return {
      query: '',
      genes: [],
    }
  },
  components: { 
    SearchResults 
  },

  methods: {
    updateQuery(evt) { 
      this.query = evt.currentTarget.value 
      console.log('query', this.query)
    },
    search() {
      console.log(`http://localhost:3000/api/search?identifier=${encodeURIComponent(this.query)}`)
      fetch(`http://localhost:3000/api/search?identifier=${encodeURIComponent(this.query)}`, {
        method: 'GET',
        headers: { Accept: 'application/json', }
      })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            let _data = JSON.parse(data)
            console.log(_data)
            this.genes = _data?.map(proxy => toRaw(proxy))
          })
        } else {
          alert('Issue searching for gene!')
        }
      })
      .catch(error => {
        console.log(error)
        alert(error)
      })
    }
  }
}
</script>

<template>
  <div class="flex-col gap-2">
    <div class="flex gap-2 justify-center">
      <input @change="updateQuery" type="text" class="rounded border border-dark-blue p-1" ref="search" placeholder="Gene Identifier">
      <button @click="search" @keyup.enter="search" class="rounded border border-dark-blue bg-camel text-cream p-1">Search</button>
    </div>
    <div class="flex justify-center">
      <SearchResults :genes="this.genes"/>
    </div>
  </div>
</template>
