<template>
  <div class="product-card drink">
    <div class="tag-container">
      <span class="trending" v-if="item.inventory.status === 'low_stock'">Bán chạy</span>
      <span class="trending-new" v-if="item.inventory.status === 'in_stock'">New</span>
      <span class="trending-remain" v-if="item.inventory.quantity <= 5">Sắp hết hàng</span>
    </div>
    <img :src="item.images[0]" alt="product" class="product-img" />
    <div class="product-code">{{ item.code }}</div>
    <div class="product-title">{{ item.name }}</div>
    <hr />
    <div class="product-toppings" v-if="item.toppings && item.toppings.length">
      <span class="toppings-label">Toppings:</span>
      <span class="toppings-list">{{ item.toppings.join(', ') }}</span>
    </div>
    <div class="product-footer">
      <div class="w-full flex justify-between items-center">
        <span class="drink-price">${{ formatPrice(item.price) }}</span>
        <span class="quantity">Số lượng: {{ item.inventory.quantity }}</span>
      </div>
    </div>
    <!-- Overlay mua ngay -->
    <div class="buy-now-overlay">
      <button class="buy-now-btn" @click="openQuickView">Mua ngay</button>
    </div>
    <QuickView :show="showQuickView" :item="item" @close="closeQuickView" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QuickView from './QuickView.vue'

const { item } = defineProps<{ item: any }>()

const showQuickView = ref(false)

function openQuickView() {
  showQuickView.value = true
}
function closeQuickView() {
  showQuickView.value = false
}

function formatPrice(price: number) {
  return price?.toLocaleString('vi-VN')
}
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 180px;
  position: relative;
  overflow: hidden;
}
.product-card .product-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}
.product-card .product-name {
  font-weight: 600;
  margin: 8px 0 4px 0;
}
.product-card .product-price {
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-bottom: 8px;
}
.product-card .quantity {
  color: #888;
  margin-left: 8px;
  font-size: 12px;
}
.drink .product-code {
  font-weight: 600;
  color: #222;
}
.drink .product-title {
  font-size: 18px;
  font-weight: bold;
  color: #1a2343;
  margin: 4px 0;
}
.drink hr {
  width: 100%;
  border: none;
  border-top: 1px solid #dbe0ea;
  margin: 8px 0;
}
.drink .product-toppings {
  font-size: 14px;
  color: #1a2343;
  margin-bottom: 8px;
}
.drink .toppings-label {
  font-weight: 600;
}
.drink .toppings-list {
  margin-left: 4px;
}
.drink .product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: auto;
}
.product-card .tag-container {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
/* Overlay mua ngay */
.buy-now-overlay {
  position: absolute;
  inset: 0;
  background: rgb(166 166 166 / 48%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 10;
}
.product-card:hover .buy-now-overlay {
  opacity: 1;
  pointer-events: auto;
}
.buy-now-btn {
  background: #ff9e0c;
  color: #fff;
  font-weight: bold;
  padding: 8px 26px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 8px #ff9e0c33;
  transition: background 0.2s;
}
.buy-now-btn:hover {
  background: #ff3c00;
}
.drink .trending,
.drink .trending-new,
.drink .trending-remain {
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  z-index: 2;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px #ff572233;
}

.drink .trending {
  background: #1a2343;
  width: fit-content;
}

.drink .trending-new {
  background: #ff9e0c;
}

.drink .trending-remain {
  background: #ff3c00;
}
.drink .drink-price {
  font-size: 20px;
  font-weight: bold;
  color: #1a2343;
}
</style>
