<template>
  <div v-if="show" class="quickview-backdrop" @click.self="close">
    <div class="quickview-modal">
      <button class="close-btn" @click="close">
        <!-- SVG đóng -->
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
      </button>
      <img :src="item.images[0]" alt="product" class="quickview-img" />
      <p class="mb-4 font-bold">{{ item.name }}</p>
      <p>Giá: ${{ formatPrice(item.price) }}</p>
      <div v-if="item.toppings && item.toppings.length" class="toppings-list">
        <p>Chọn toppings:</p>
        <a-checkbox-group v-model:value="selectedToppings">
          <div class="toppings-checkboxes">
            <a-checkbox
              v-for="(topping, idx) in item.toppings"
              :key="idx"
              :value="topping"
              class="flex items-center text-blue-900"
            >
              <span class="ml-2">{{ topping }}</span>
            </a-checkbox>
          </div>
        </a-checkbox-group>
      </div>
      <div class="quantity-row">
        <span>Số lượng:</span>
        <a-input-number
          v-model:value="quantity"
          :min="1"
          :max="item.inventory?.quantity || 99"
          :step="1"
          style="margin-left: 12px; width: 100px"
        />
      </div>
      <a-button
        type="primary"
        block
        class="add-cart-btn"
        @click="addToCart"
      >
        Thêm vào giỏ hàng
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button as AButton, CheckboxGroup as ACheckboxGroup, Checkbox as ACheckbox, InputNumber as AInputNumber, message } from 'ant-design-vue'
import { useDataStore } from '../stores/data'
const dataStore = useDataStore()

const props = defineProps<{
  show: boolean,
  item: any,
}>()
const emit = defineEmits(['close'])

const selectedToppings = ref<string[]>([])
const quantity = ref(1)

watch(
  () => props.show,
  (val) => {
    if (val) {
      selectedToppings.value = []
      quantity.value = 1
    }
  }
)

function close() {
  emit('close')
}
function addToCart() {
  if (quantity.value < 1) {
    message.error('Số lượng phải lớn hơn 0');
    return;
  }

  const cartItem = {
    ...props.item,
    selectedToppings: selectedToppings.value,
    quantity: quantity.value
  }

  const cart = JSON.parse(localStorage.getItem('cart-items') || '[]')

  const idx = cart.findIndex(
    (item) =>
      item.id === cartItem.id &&
      JSON.stringify(item.selectedToppings) === JSON.stringify(cartItem.selectedToppings)
  )

  if (idx > -1) {
    cart[idx].quantity = Number(cart[idx].quantity) + Number(cartItem.quantity)
  } else {
    cart.push(cartItem)
  }

  localStorage.setItem('cart-items', JSON.stringify(cart))

  const totalQuantity = cart.reduce((sum: number, item: Object) => sum + Number(item.quantity), 0)
  dataStore.setState('cartTotalQuantity', totalQuantity) 

  message.success('Đã thêm vào giỏ hàng!')
  close()
}
function formatPrice(price: number) {
  return price?.toLocaleString('vi-VN')
}
</script>

<style scoped>
.quickview-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.quickview-modal {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  min-width: 450px;
  max-width: 90vw;
  position: relative;
  box-shadow: 0 2px 16px #0002;
}
.close-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
.quickview-img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}
.toppings-list {
  margin: 12px 0;
}
.toppings-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-top: 6px;
  max-width: 450px;
}
.quantity-row {
  display: flex;
  align-items: center;
  margin: 18px 0 0 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}
.add-cart-btn {
  margin-top: 20px;
  height: 44px;
  font-size: 18px;
  font-weight: 600;
  background: #ff0000;
  color: #fff !important;
  border: none;
  border-radius: 6px;
  box-shadow: none;
  letter-spacing: 0.2px;
  text-align: center;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.add-cart-btn:hover, .add-cart-btn:focus {
  background: #e6764b;
  color: #fff !important;
}
</style>
