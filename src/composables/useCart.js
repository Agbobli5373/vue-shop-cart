import { reactive } from 'vue'

/**
 * Custom hook for managing a shopping cart.
 *
 * @returns {Object} - An object containing the cart items and functions to manipulate the cart.
 * @property {Array} cartItems - The list of items in the cart.
 * @property {Function} addToCart - Function to add a product to the cart.
 * @property {Function} removeFromCart - Function to remove a product from the cart by its id.
 * @property {Function} updateQuantity - Function to update the quantity of a product in the cart.
 */
export function useCart() {
  const cartItems = reactive([])

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.push({ ...product, quantity: 1 })
    }
  }

  /**
   * Removes an item from the cart based on the provided id.
   *
   * @param {number} id - The unique identifier of the item to be removed from the cart.
   */
  const removeFromCart = (id) => {
    const index = cartItems.findIndex((item) => item.id === id)
    if (index !== -1) {
      cartItems.splice(index, 1)
    }
  }

  /**
   * Updates the quantity of an item in the cart.
   *
   * @param {number} id - The ID of the item to update.
   * @param {number} quantity - The new quantity for the item.
   */
  const updateQuantity = (id, quantity) => {
    const item = cartItems.find((item) => item.id === id)
    if (item) {
      item.quantity = quantity
    }
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  }
}
