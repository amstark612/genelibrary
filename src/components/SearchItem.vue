<script>
export default {
  props: {
    identifier: String,
    id: Number
  }
}
</script>

<template>
  <div>
    <RouterLink :to="{name: 'gene', params: { id: this.id }}">
      <span class="uppercase">{{ this.identifier }}</span>
    </RouterLink>
  </div>
</template>