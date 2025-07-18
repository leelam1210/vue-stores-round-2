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
</script>

<template>
  <div class="topbar flex items-center justify-between h-16 pr-6">
    <h1 class="text-xl font-semibold">{{ activeCategoryName }}</h1>
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
      <div class="relative cart-icon flex items-center space-x-3">
        <button class="p-1 w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-gray-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"><path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path></svg>
        </button>
        <span class="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {{ data.cartTotalQuantity }}
        </span>
      </div>
    </Popover>
  </div>
</template>

<style scoped>
.topbar {
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.03);
  background: #fff;
}
</style>