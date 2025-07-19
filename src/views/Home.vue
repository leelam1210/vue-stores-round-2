<script setup>
import Sidebar from '../components/Sidebar.vue'
import TopBar from '../components/TopBar.vue'
import Toppings from '../components/Toppings.vue'
import ListProduct from '../components/ListProduct.vue'
import FavoriteProducts from '../components/FavoriteProducts.vue'

</script>
<template>
  <Sidebar />
  <div class="flex-1 flex flex-col bg-white">
    <TopBar />
    <div class="layout-view--wrapper">
      <div class="page-content">
        <Toppings/>
        <ListProduct/>
        <FavoriteProducts/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-view--wrapper {
  flex: 1;
  padding: 16px;
  background-color: #EEEEEE;
  border-radius: 10px 0 0;
  overflow: auto;
  display: flex;
  justify-content: center;
}
.page-content {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  width: -webkit-fill-available;
  height: fit-content;
}
</style>