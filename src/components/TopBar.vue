<script setup>
import { computed } from 'vue'
import { useDataStore } from '../stores/data'
import { Popover } from 'ant-design-vue'
import CartItem from './CartItem.vue'

const data = useDataStore()

const activeCategoryName = computed(() => {
  const found = data.categories.find(cat => cat.id === data.categorySelectedId)
  return found ? found.name : ''
})

const cartItems = computed(() => {
  data.cartTotalQuantity
  return JSON.parse(localStorage.getItem('cart-items') || '[]')
})

const favoriteItems = computed(() => {
  data.favoriteTotal
  const favoriteIds = JSON.parse(localStorage.getItem('favorite-items') || '[]')
  return favoriteIds.map(id => {
    return data.products.find(product => product.id === id)
  }).filter(product => product !== undefined)
})

const removeFromFavorites = (productId) => {
  const favoriteIds = JSON.parse(localStorage.getItem('favorite-items') || '[]')
  const updatedFavorites = favoriteIds.filter(id => id !== productId)
  localStorage.setItem('favorite-items', JSON.stringify(updatedFavorites))
  data.setState('favoriteTotal', updatedFavorites.length)
}
</script>

<template>
  <div class="topbar flex items-center justify-between h-16 pr-6">
    <h1 class="text-xl font-semibold">{{ activeCategoryName }}</h1>
    <div class="flex items-center space-x-3">
      <!-- Favorite Icon -->
      <Popover
        placement="bottomRight"
        trigger="click"
      >
        <template #content>
          <div class="w-[400px]">
            <div v-if="favoriteItems.length === 0" class="text-gray-400 text-center">
              Chưa có sản phẩm yêu thích
            </div>
            <div class="favorite-list">
              <div
                v-for="(item, idx) in favoriteItems"
                :key="idx"
                class="flex items-center justify-between p-3 border-b last:border-b-0"
              >
                <div class="flex space-x-3">
                  <img :src="item.images[0]" :alt="item.name" class="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h4 class="font-medium">{{ item.name }}</h4>
                    <p class="text-sm text-gray-500">{{ item.price }}đ</p>
                  </div>
                </div>
                <div 
                  class="text-red-500 hover:text-red-700 cursor-pointer"
                  @click="removeFromFavorites(item.id)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="relative favorite-icon mr-4">
          <button class="p-1 w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-gray-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256">
              <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
            </svg>
          </button>
          <span v-if="data.favoriteTotal > 0" class="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ data.favoriteTotal }}
          </span>
        </div>
      </Popover>

      <!-- Cart Icon -->
      <Popover
        placement="bottomRight"
        trigger="click"
      >
        <template #content>
          <div class="w-[400px]">
            <div v-if="cartItems.length === 0" class="text-gray-400 text-center">
              Giỏ hàng trống
            </div>
            <div class="cart-list">
              <CartItem
                v-for="(item, idx) in cartItems"
                :key="idx"
                :item="item"
              />
            </div>
          </div>
        </template>
        <div class="relative cart-icon">
          <button class="p-1 w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-gray-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"><path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path></svg>
          </button>
          <span class="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ data.cartTotalQuantity }}
          </span>
        </div>
      </Popover>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.03);
  background: #fff;
}
</style>