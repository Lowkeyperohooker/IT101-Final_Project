<script setup>
import { computed } from 'vue';

const props = defineProps({
  cart: Array
});

// [UPDATED] Added 'remove-item' to the list of events we can send
const emit = defineEmits(['navigate', 'checkout', 'remove-item']);

const cartTotal = computed(() => props.cart.reduce((total, item) => total + item.price, 0));
</script>

<template>
  <section class="page-section cart-view">
    <h2>Your Bag <span style="color:#94a3b8">({{ cart.length }})</span></h2>
    
    <div v-if="cart.length === 0" class="empty-state">
      <p>Your bag is empty.</p>
      <button class="btn-secondary" @click="$emit('navigate', 'products')">View Products</button>
    </div>
    
    <div v-else class="cart-container">
      <div class="cart-list">
        <div v-for="(item, index) in cart" :key="index" class="cart-row">
          <img :src="item.image" class="thumb">
          
          <div class="row-info">
            <h4>{{ item.name }}</h4>
            <span class="row-price">${{ item.price }}</span>
          </div>

          <button class="remove-btn" @click="$emit('remove-item', index)" title="Remove item">
            &minus;
          </button>
        </div>
      </div>
      
      <div class="cart-summary">
        <h3>Summary</h3>
        <div class="sum-row"><span>Subtotal</span> <span>${{ cartTotal }}</span></div>
        <div class="sum-row"><span>Tax</span> <span>$0.00</span></div>
        <hr>
        <div class="sum-row total"><span>Total</span> <span>${{ cartTotal }}</span></div>
        <button class="btn-primary full" @click="$emit('checkout')">Member Checkout</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-section { max-width: 1200px; margin: 0 auto; padding: 2rem; animation: fadeIn 0.3s ease; }
.cart-container { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem; }

/* Row Styling */
.cart-row { 
  display: flex; 
  align-items: center; 
  gap: 1rem; 
  background: white; 
  padding: 1rem; 
  margin-bottom: 1rem; 
  border-radius: 8px; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.05); /* Slight shadow for depth */
}

.thumb { width: 80px; height: 80px; object-fit: cover; border-radius: 4px; }
.row-info { flex: 1; /* Pushes the button to the far right */ }

/* [NEW] Remove Button Styling */
.remove-btn {
  background: #fee2e2;
  color: #ef4444;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%; /* Circle shape */
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding-bottom: 4px; /* Visual alignment adjustment */
}
.remove-btn:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}

.cart-summary { background: white; padding: 2rem; border-radius: 12px; height: fit-content; }
.sum-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: var(--text-muted); }
.total { font-weight: 800; color: var(--primary); font-size: 1.2rem; margin-top: 1rem; border-top: 1px solid var(--border); padding-top: 1rem; }
.empty-state { text-align: center; padding: 4rem; color: var(--text-muted); }

@media (max-width: 768px) {
  .cart-container { grid-template-columns: 1fr; }
}
</style>