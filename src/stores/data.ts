import { defineStore } from 'pinia'
import { MockMenuService } from '../mock-data/mockMenuService.js'
import { ref } from 'vue'

const mockMenuService = new MockMenuService()

export const useDataStore = defineStore('data', {
  state: () => ({
    categories: [],
    products: [],
    toppings: [],
    loading: false,
    error: null,
    categorySelectedId: 1,
    cartTotalQuantity: 0,
    filteredProducts: ref<any[]>([])
  }),
  actions: {
    setCategorySelectedId(id: number) {
      this.categorySelectedId = id
    },
    setState(key: string, value: number) {
      this[key] = value
    },
    async init() {
      this.loading = true
      this.error = null
      try {
        await mockMenuService.init()
        await this.loadProducts({categoryId: 1})

        const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]')
        const totalQuantity = cartItems.reduce((sum: number, item: Object) => sum + (item.quantity || 0), 0)
        this.cartTotalQuantity = totalQuantity

      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async loadCategories() {
      this.loading = true
      this.error = null
      try {
        const res = await mockMenuService.getCategories()
        if (res.success) {
          this.categories = res.data
        } else {
          this.error = res.error
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async loadProducts(options = {}) {
      this.loading = true
      this.error = null
      try {
        const res = await mockMenuService.getProducts(options)
        if (res.success) {
          this.products = res.data
        } else {
          this.error = res.error
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async loadToppings(options = {}) {
      this.loading = true
      this.error = null
      try {
        const res = await mockMenuService.getToppings(options)
        if (res.success) {
          this.toppings = res.data
        } else {
          this.error = res.error
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})