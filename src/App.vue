<script setup>
import Home from './views/Home.vue'
import { useDataStore } from './stores/data'
import { onMounted } from 'vue'

const store = useDataStore()
onMounted(() => {
  store.init()
})
</script>

<template>
  <div class="flex w-screen h-screen bg-gray-100">
    <Home/>
  </div>
</template>