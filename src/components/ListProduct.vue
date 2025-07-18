<template>
  <div class="bg-gray-100 p-4 mt-6 rounded w-full">
    <div class="font-bold mb-4">PRODUCT:</div>
    <div
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      v-if="!data.loading"
    >
      <ProductItem v-for="item in products" :key="item.id" :item="item" />
    </div>
    <div v-else class="text-center text-gray-500 py-8">
      <div class="flex flex-col items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        Đang tải sản phẩm...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/data'
import { computed } from 'vue'
import ProductItem from './ProductItem.vue'

const data = useDataStore()
const products = computed<any[]>(() => data.products as any[])
</script>