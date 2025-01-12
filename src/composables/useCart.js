import { reactive } from 'vue'

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

  const removeFromCart = (id) => {
    const index = cartItems.findIndex((item) => item.id === id)
    if (index !== -1) {
      cartItems.splice(index, 1)
    }
  }

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
