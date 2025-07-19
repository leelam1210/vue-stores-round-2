<template>
  <div class="cart-item">
    <img :src="item.images[0]" alt="product" class="cart-item__img" />
    <div class="cart-item__info">
      <div class="cart-item__header">
        <div>
          <div class="cart-item__name">{{ item.name }}</div>
          <div v-if="item.selectedToppings && item.selectedToppings.length" class="cart-item__toppings">
            <span v-for="(topping, idx) in item.selectedToppings" :key="idx" class="cart-item__topping">
              {{ topping }}
            </span>
          </div>
        </div>
        <button class="cart-item__remove" @click="removeItem">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
        </button>
      </div>
      <div class="cart-item__footer">
        <a-input-number
          :value="item.quantity"
          :min="1"
          :max="item.inventory?.quantity || 99"
          :step="1"
          @change="onQuantityChange"
        />

        <div class="cart-item__price">
          ${{ item.price.toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputNumber as AInputNumber } from 'ant-design-vue'
import { useDataStore } from '../stores/data'
const dataStore = useDataStore()

const props = defineProps<{
  item: any
}>()

interface CartItem {
  quantity: number
  [key: string]: any
}

function onQuantityChange(value: number | string) {
  const cart = JSON.parse(localStorage.getItem('cart-items') || '[]')
  const idx = cart.findIndex(
    (cartItem: any) =>
      cartItem.id === props.item.id &&
      JSON.stringify(cartItem.selectedToppings) === JSON.stringify(props.item.selectedToppings)
  )
  if (idx > -1) {
    cart[idx].quantity = value
    localStorage.setItem('cart-items', JSON.stringify(cart))

    const totalQuantity = cart.reduce((sum: number, item: CartItem) => sum + Number(item.quantity), 0)
    dataStore.setState('cartTotalQuantity', totalQuantity) 
  }
}

function removeItem() {
  const cart = JSON.parse(localStorage.getItem('cart-items') || '[]')
  const idx = cart.findIndex(
    (cartItem: any) =>
      cartItem.id === props.item.id &&
      JSON.stringify(cartItem.selectedToppings) === JSON.stringify(props.item.selectedToppings)
  )
  if (idx > -1) {
    cart.splice(idx, 1)
    localStorage.setItem('cart-items', JSON.stringify(cart))

    const totalQuantity = cart.reduce((sum: number, item: CartItem) => sum + Number(item.quantity), 0)
    dataStore.setState('cartTotalQuantity', totalQuantity)
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px 0;
}
.cart-item__img {
  width: 56px;
  height: auto;
  min-height: 80px;
  object-fit: cover;
  border-radius: 4px;
}
.cart-item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cart-item__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.cart-item__name {
  font-weight: 500;
  margin-bottom: 2px;
}
.cart-item__size {
  font-size: 13px;
  color: #555;
  margin-bottom: 2px;
}
.cart-item__toppings {
  font-size: 12px;
  color: #888;
}
.cart-item__topping:not(:last-child)::after {
  content: ', ';
}
.cart-item__remove {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #111;
  line-height: 1;
}
.cart-item__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.cart-item__price {
  font-weight: bold;
  font-size: 16px;
}
</style>
