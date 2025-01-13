<script setup>
import { computed } from 'vue'

/**
 * Props for the ProductCart component.
 *
 * @property {Array} cartItems - An array of items in the cart. This prop is required.
 */
const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
})

/**
 * Emits custom events for removing an item from the cart and updating the quantity of an item.
 *
 * @event remove-item - Emitted when an item is removed from the cart.
 * @event update-quantity - Emitted when the quantity of an item in the cart is updated.
 */
const emit = defineEmits(['remove-item', 'update-quantity'])

/**
 * Computes the total price of all items in the cart.
 *
 * This computed property iterates over the `cartItems` prop and calculates
 * the sum of the price multiplied by the quantity for each item.
 *
 * @returns {number} The total price of all items in the cart.
 */
const total = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

/**
 * Emits an event to remove an item from the cart.
 *
 * @param {string|number} id - The unique identifier of the item to be removed.
 */
const removeItem = (id) => {
  emit('remove-item', id)
}
/**
 * Updates the quantity of a product in the cart.
 *
 * @param {number} id - The unique identifier of the product.
 * @param {number} quantity - The new quantity of the product.
 * @emits update-quantity - Emits an event to update the quantity of the product in the cart.
 */

const updateQuantity = (id, quantity) => {
  emit('update-quantity', id, quantity)
}

/**
 * Formats a given number as a currency string in Ghanaian Cedi (GHC).
 *
 * @param {number} value - The numeric value to be formatted.
 * @returns {string} The formatted currency string in the format "GHCxx.xx".
 */
const formatCurrency = (value) => {
  return `GHC${value.toFixed(2)}`
}
</script>

<template>
  <section class="cart">
    <h2 class="cart-title">Shopping Cart</h2>
    <div v-if="cartItems.length" class="cart-container">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" class="cart-image" />
          </div>
          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <div class="item-stock">In Stock</div>
            <div class="item-actions">
              <div class="quantity-selector">
                <select
                  v-model.number="item.quantity"
                  @change="updateQuantity(item.id, item.quantity)"
                  class="quantity-dropdown"
                >
                  <option v-for="n in parseInt(item.qty)" :key="n" :value="n">Qty: {{ n }}</option>
                </select>
                <button @click="removeItem(item.id)" class="delete-btn">Delete</button>
              </div>
            </div>
          </div>
          <div class="item-price">
            <span class="price-amount">{{ formatCurrency(item.price) }}</span>
          </div>
        </div>
      </div>
      <div class="cart-summary">
        <div class="subtotal">
          <span>Subtotal ({{ cartItems.length }} items):</span>
          <span class="subtotal-amount">{{ formatCurrency(total) }}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <h3>Your Cart is empty</h3>
      <p>Shop today's deals</p>
    </div>
  </section>
</template>

<style scoped>
.cart {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  height: fit-content;
}

.cart-title {
  color: var(--primary-color);
  font-size: 24px;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.cart-container {
  display: flex;
  gap: 20px;
}

.cart-items {
  flex: 1;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-color);
}

.cart-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
}

.item-name {
  font-size: 18px;
  color: #0066c0;
  margin: 0 0 8px;
}

.item-stock {
  color: #007600;
  font-size: 12px;
  margin: 8px 0;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.quantity-dropdown {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f0f2f2;
  cursor: pointer;
}

.delete-btn {
  color: #0066c0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
}

.delete-btn:hover {
  color: #c45500;
  text-decoration: underline;
}

.price-amount {
  font-size: 18px;
  font-weight: 700;
  color: #0f1111;
}

.cart-summary {
  background: #f3f3f3;
  border-radius: var(--radius-sm);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.subtotal {
  font-size: 18px;
  margin-bottom: 20px;
}

.subtotal-amount {
  font-weight: 700;
}

.checkout-btn {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--secondary-color);
  border: 1px solid var(--hover-color);
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.checkout-btn:hover {
  background: var(--hover-color);
}

.empty-cart {
  text-align: center;
  padding: 40px;
}

.empty-cart h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.empty-cart p {
  color: #0066c0;
  cursor: pointer;
}

@media (max-width: 768px) {
  .cart-container {
    flex-direction: column;
  }

  .cart-summary {
    width: 100%;
  }

  .cart-image {
    width: 100px;
    height: 100px;
  }
}
</style>
