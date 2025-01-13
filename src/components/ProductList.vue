<script setup>
import { ref } from 'vue'

/**
 * Emits an event when a product is added to the cart.
 *
 * @event add-to-cart
 */
const emit = defineEmits(['add-to-cart'])

/**
 * A reactive reference to an array of product objects.
 * Each product object contains the following properties:
 *
 * @property {number} id - The unique identifier for the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {number} rating - The rating of the product (out of 5).
 * @property {number} reviews - The number of reviews for the product.
 * @property {number} qty - The quantity of the product available in stock.
 * @property {string} image - The URL of the product image.
 */
const products = ref([
  {
    id: 1,
    name: 'Nike Air Max 270',
    price: 100,
    rating: 4,
    reviews:234,
    qty:10,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },
  {
    id: 2,
    name: 'Adidas Superstar',
    price: 150,
    rating: 5,
    reviews:24,
    qty:46,
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b',
  },
  {
    id: 3,
    name: 'Air Jordan 1',
    price: 200,
    rating: 4,
    reviews:989,
    qty:20,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
  },
])

/**
 * Adds the specified product to the cart by emitting an 'add-to-cart' event.
 *
 * @param {Object} product - The product to be added to the cart.
 */

const addToCart = (product) => {
  emit('add-to-cart', product)
}

/**
 * Generates a string representation of the star rating.
 *
 * @param {number} rating - The rating value (from 0 to 5).
 * @returns {string} A string of stars (★) and empty stars (☆) representing the rating.
 */
const getStars = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}
</script>

<template>
  <section class="product-list">
    <h2 class="section-title">Available Products</h2>
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image-wrapper">
          <img :src="product.image" :alt="product.name" class="product-image" />
        </div>
        <div class="product-details">
          <h3 class="product-title">{{ product.name }}</h3>
          <div class="rating">
            <span class="stars" v-html="getStars(product.rating)"></span>
            <span class="reviews">{{ product.reviews }}</span>
          </div>
          <div class="price">
            <span class="currency">GHC</span>
            <span class="amount">{{ product.price.toFixed(2) }}</span>
          </div>
          <button class="add-to-cart-btn" @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-list {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.section-title {
  color: var(--primary-color);
  font-size: 24px;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-lg);
}

.product-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.product-image-wrapper {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-title {
  font-size: 16px;
  color: #0f1111;
  margin-bottom: 8px;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
}

.rating {
  margin-bottom: 8px;
}

.stars {
  color: #ffa41c;
  letter-spacing: 2px;
}

.reviews {
  color: #007185;
  font-size: 14px;
  margin-left: 5px;
}

.price {
  margin: 12px 0;
}

.currency {
  font-size: 12px;
  position: relative;
  top: -0.5em;
  margin-right: 2px;
}

.amount {
  font-size: 21px;
  font-weight: 500;
  color: #0f1111;
}

.add-to-cart-btn {
  width: 100%;
  padding: 8px 0;
  background: #ffd814;
  border: 1px solid #fcd200;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
  background: #f7ca00;
}

.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .product-title {
    font-size: 14px;
  }

  .amount {
    font-size: 18px;
  }
}
</style>
