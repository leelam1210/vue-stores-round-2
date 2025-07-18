/**
 * Milk Tea & Coffee Shop Mock API Service
 * Simulates real API behavior with delays, filtering, and sorting for a milk tea shop
 * usage: create an instance of this class to use the mock service:
 *    const mockMenuService = new MockMenuService();
 */

import mockMenuData from './mockMenuData.json';

let milkTeaShopData = null;

function loadData() {
  if (!milkTeaShopData) {
    try {
      milkTeaShopData = mockMenuData;
    } catch (error) {
      console.error('Failed to load milk tea shop data:', error);
      throw new Error('Failed to load shop data');
    }
  }

  return milkTeaShopData;
}

class MockMenuService {
  constructor() {
    this.categories = null;
    this.products = null;
    this.dataLoaded = false;

    // Default API delay range (milliseconds)
    this.minDelay = 200;
    this.maxDelay = 1000;
  }

  /**
   * Initialize the service by loading data
   */
  async init() {
    if (!this.dataLoaded) {
      const data = await loadData();

      this.categories = data.categories;
      this.products = data.products;
      this.dataLoaded = true;
    }
  }

  /**
   * Ensure data is loaded before proceeding
   */
  async ensureDataLoaded() {
    if (!this.dataLoaded) {
      await this.init();
    }
  }

  /**
   * Simulate network delay to mimic real API behavior
   * @param {number} min - Minimum delay in milliseconds
   * @param {number} max - Maximum delay in milliseconds
   * @returns {Promise}
   */
  simulateDelay(min = this.minDelay, max = this.maxDelay) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;

    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Get all categories
   * @returns {Promise<Object>}
   */
  async getCategories() {
    await this.ensureDataLoaded();
    await this.simulateDelay();

    try {
      return {
        success: true,
        data: this.categories,
        total: this.categories.length,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  /**
   * Get all products with filtering
   * @param {Object} options - Query options
   * @param {number} options.categoryId - Filter by category ID
   * @param {string[]} options.toppings - Filter by toppings (array of topping names)
   * @returns {Promise<Object>}
   */
  async getProducts(options = {}) {
    await this.ensureDataLoaded();
    await this.simulateDelay();

    try {
      let filteredProducts = [...this.products];

      // Apply category filter
      if (options.categoryId) {
        filteredProducts = filteredProducts.filter(product => (
          product.categoryId === options.categoryId
        ));
      }

      // Apply toppings filter
      if (options.toppings && options.toppings.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
          const productToppings = product.toppings.map(t => t.toLowerCase());

          // Check if the product has ANY of the selected toppings
          return options.toppings.some(selectedTopping => (
            productToppings.some(productTopping => (
              productTopping === selectedTopping.toLowerCase()
            ))
          ));
        });
      }

      // Add category information and inventory defaults to products
      const productsWithCategory = filteredProducts.map(product => ({
        ...product,
        category: this.categories.find(c => c.id === product.categoryId),
        inventory: product.inventory,
      }));

      return {
        success: true,
        data: productsWithCategory,
        total: productsWithCategory.length,
        filters: options,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  /**
   * Get all unique toppings from products
   * @returns {Promise<Object>}
   */
  async getToppings(options = {}) {
    await this.ensureDataLoaded();
    await this.simulateDelay(100, 200);

    try {
      const toppingsSet = new Set();

      this.products
        .filter(product => product.categoryId === options.categoryId)
        .forEach(product => {
          product.toppings.forEach(topping => {
            toppingsSet.add(topping);
          });
        });

      const toppings = Array.from(toppingsSet).sort();

      return {
        success: true,
        data: toppings,
        total: toppings.length,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }
}

export { MockMenuService };
