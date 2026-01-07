<script setup>
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const cart = inject('cart');
const removeFromCart = inject('removeFromCart');

const cartTotal = computed(() => cart.reduce((total, item) => total + item.price, 0));

const goToCheckout = () => {
  router.push('/checkout');
};
</script>

<template>
  <section class="max-w-7xl mx-auto p-8 animate-[fadeIn_0.3s_ease]">
    
    <h2 class="text-2xl font-black mb-6">Your Bag <span class="text-gray-400 font-normal">({{ cart.length }})</span></h2>
    
    <div v-if="cart.length === 0" class="text-center py-20 text-text-muted">
      <p class="mb-6 text-lg">Your bag is empty.</p>
      <button class="btn-secondary" @click="router.push('/products')">View Products</button>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mt-8">
      
      <div class="flex flex-col">
        <div v-for="(item, index) in cart" :key="index" class="flex items-center gap-4 bg-surface p-4 mb-4 rounded-lg shadow-sm border border-transparent hover:border-border transition-colors">
          <img :src="item.image" class="w-20 h-20 object-cover rounded-md">
          
          <div class="flex-1">
            <h4 class="font-bold text-primary">{{ item.name }}</h4>
            <span class="font-medium text-text-muted">₱{{ item.price.toLocaleString() }}</span>
          </div>

          <button 
            class="w-8 h-8 rounded-full bg-red-100 text-red-500 text-xl leading-none flex items-center justify-center pb-1 transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-110" 
            @click="removeFromCart(index)" 
            title="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div class="bg-surface p-8 rounded-2xl h-fit shadow-sm border border-border">
        <h3 class="text-xl font-bold mb-6">Summary</h3>
        
        <div class="flex justify-between mb-3 text-text-muted font-medium">
          <span>Subtotal</span> 
          <span>₱{{ cartTotal.toLocaleString() }}</span>
        </div>
        
        <div class="flex justify-between mb-3 text-text-muted font-medium">
          <span>Tax</span> 
          <span>₱0.00</span>
        </div>
        
        <hr class="border-border my-6">
        
        <div class="flex justify-between font-extrabold text-primary text-xl mb-6">
          <span>Total</span> 
          <span>₱{{ cartTotal.toLocaleString() }}</span>
        </div>
        
        <button class="btn-primary full" @click="goToCheckout">Member Checkout</button>
      </div>
    </div>
  </section>
</template>