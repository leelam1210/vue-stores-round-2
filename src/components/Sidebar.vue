<script setup>
import { computed, onMounted } from 'vue'
import { useDataStore } from '../stores/data'

const data = useDataStore()

onMounted(() => {
  if (!data.categories.length) {
    data.loadCategories()
  }
})

const menu = computed(() => data.categories)
const activeMenuId = computed(() => data.categorySelectedId)

function handleSelect(id) {
  data.setCategorySelectedId(id)
  data.loadProducts({categoryId: id})
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <span class="brand">MILK TEA STORE</span>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li
          v-for="item in menu"
          :key="item.id"
          :class="['sidebar-item', { active: item.id === activeMenuId }]"
          @click="handleSelect(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  width: 240px;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.03);
}
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 16px 24px;
}
.logo {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
.brand {
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: -0.01em;
}
.sidebar-nav {
  flex: 1;
  margin: 0 16px;
  min-width: 210px;
}
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 20px;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  border-left: 4px solid transparent;
  border-radius: 0 8px 8px 0;
  font-size: 14px;
  font-style: normal;
  line-height: 22px;
  font-weight: 500;
}
.sidebar-item:hover {
  background: #f3f4f6;
  color: #16a34a;
}
.sidebar-item.active {
  background: #f0fdf4;
  color: #15803d;
  border-left: 4px solid #22c55e;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.03);
}
.icon {
  color: #9ca3af;
  display: flex;
  align-items: center;
}
.sidebar-item.active .icon,
.icon-active {
  color: #22c55e;
}
</style>