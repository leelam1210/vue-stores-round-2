import { defineStore } from 'pinia'
import { MockMenuService } from '../mock-data/mockMenuService.js'
import { ref } from 'vue'

const mockMenuService = new MockMenuService()

interface CartItem {
  quantity: number
  [key: string]: any
}

export const useDataStore = defineStore('data', {
  state: () => ({
    categories: [],
    products: [],
    toppings: [],
    loading: false,
    categorySelectedId: 1,
    cartTotalQuantity: 0,
    filteredProducts: ref<any[]>([])
  }),
  actions: {
    setCategorySelectedId(id: number) {
      this.categorySelectedId = id
    },
    setState(key: string, value: number) {
      (this as any)[key] = value
    },
    async init() {
      this.loading = true
      try {
        await mockMenuService.init()
        await this.loadProducts({categoryId: 1})

        const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]')
        const totalQuantity = cartItems.reduce((sum: number, item: CartItem) => sum + (item.quantity || 0), 0)
        this.cartTotalQuantity = totalQuantity

      } catch (err) {
        console.log(err, 'err')
      } finally {
        this.loading = false
      }
    },
    async loadCategories() {
      this.loading = true
      try {
        const res = await mockMenuService.getCategories()
        if (res.success) {
          this.categories = res.data
        }
      } catch (err) {
        console.log(err, 'err')
      } finally {
        this.loading = false
      }
    },
    async loadProducts(options = {}) {
      this.loading = true
      try {
        const res = await mockMenuService.getProducts(options)
        if (res.success) {
          this.products = res.data
        }
      } catch (err) {
        console.log(err, 'err')
      } finally {
        this.loading = false
      }
    },
    async loadToppings(options = {}) {
      this.loading = true
      try {
        const res = await mockMenuService.getToppings(options)
        if (res.success) {
          this.toppings = res.data
        }
      } catch (err) {
        console.log(err, 'err')
      } finally {
        this.loading = false
      }
    }
  }
})