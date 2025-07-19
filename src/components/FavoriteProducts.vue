<template>
  <div class="bg-gray-100 p-4 mt-6 rounded w-full" v-if="favoriteProducts.length > 0">
    <div class="font-bold mb-4 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff4757" viewBox="0 0 256 256">
        <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
      </svg>
      SẢN PHẨM YÊU THÍCH ({{ favoriteProducts.length }})
    </div>
    <div
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      v-if="!data.loading"
    >
      <ProductItem v-for="item in favoriteProducts" :key="item.id" :item="item" />
    </div>
    <div v-else class="text-center text-gray-500 py-8">
      <div class="flex flex-col items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        Đang tải sản phẩm yêu thích...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/data'
import { computed } from 'vue'
import ProductItem from './ProductItem.vue'

const data = useDataStore()

const favoriteProducts = computed(() => {
  data.favoriteTotal
  const favoriteIds = JSON.parse(localStorage.getItem('favorite-items') || '[]')
  return data.products.filter(product => favoriteIds.includes(product.id))
})
</script> 