<template>
  <div class="bg-gray-100 p-4 rounded w-full">
    <div class="font-bold mb-4">TOPPINGS:</div>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
      <a-checkbox
        v-for="(topping, idx) in toppings"
        :key="idx"
        v-model:checked="checked[idx]"
        class="flex items-center text-blue-900"
      >
        <span class="ml-2">{{ topping }}</span>
      </a-checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Checkbox as ACheckbox } from 'ant-design-vue'
import { useDataStore } from '../stores/data'

const checked = ref<boolean[]>([])

const dataStore = useDataStore()
const toppings = computed(() => dataStore.toppings)

const checkedToppings = computed(() =>
  toppings.value.filter((_, idx) => checked.value[idx])
)

watch(checkedToppings, () => {
  dataStore.loadProducts({categoryId: dataStore.categorySelectedId, toppings: checkedToppings.value})
}, { immediate: true, deep: true })

watch(
  () => dataStore.categorySelectedId,
  async (newVal) => {
    await dataStore.loadToppings({ categoryId: newVal })
    checked.value = toppings.value.map(() => false)
  }
)

onMounted(async () => {
  await dataStore.loadToppings({categoryId: dataStore.categorySelectedId})
  checked.value = toppings.value.map(() => false)
})
</script>