
<script setup>
import ProductList from './components/ProductList.vue'
import ProductCart from './components/ProductCart.vue'
import { useCart } from './composables/useCart'

/**
 * Destructures the following methods and properties from the useCart composable:
 *
 * - `cartItems`: An array containing the items currently in the cart.
 * - `addToCart`: A function to add an item to the cart.
 * - `removeFromCart`: A function to remove an item from the cart.
 * - `updateQuantity`: A function to update the quantity of an item in the cart.
 */
const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart()
</script>

<template>
  <main class="app">
    <h1 class="title">Shopping Cart</h1>
    <div class="container">
      <ProductList @add-to-cart="addToCart" />
      <ProductCart
        :cart-items="cartItems"
        @remove-item="removeFromCart"
        @update-quantity="updateQuantity"
      />
    </div>
  </main>
</template>

<style>
.app {
  background: #f5f5f5;
  min-height: 100vh;
  padding: var(--spacing-xl);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xl);
}

.title {
  color: var(--primary-color);
  font-size: 32px;
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
