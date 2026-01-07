<script setup>
import { ref, reactive, computed } from 'vue';

// --- IMPORT COMPONENTS ---
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';
import HomeView from './views/HomeView.vue';
import ProductList from './views/ProductList.vue';
import ProductDetails from './views/ProductDetails.vue';
import CartView from './views/CartView.vue';
import CheckoutView from './views/CheckoutView.vue';

// --- STATE ---
const currentView = ref('home');
const cart = reactive([]);
const isAnimatingCart = ref(false);
const selectedProduct = ref(null);

// --- DATA: The 12 Unique Products ---
const products = reactive([
  { 
    id: 1, 
    name: "Nike Air Zoom Pegasus", 
    price: 6995, 
    category: "Running", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 2, 
    name: "Nike Air Force 1 '07", 
    price: 6395, 
    category: "Lifestyle", 
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 3, 
    name: "Nike Dunk Low Retro", 
    price: 8150, 
    category: "Streetwear", 
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 4, 
    name: "Nike Metcon 8", 
    price: 7550, 
    category: "Training", 
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 5, 
    name: "Nike Air Max 97", 
    price: 10150, 
    category: "Lifestyle", 
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 6, 
    name: "Nike Blazer Mid '77", 
    price: 6095, 
    category: "Vintage", 
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/389b709e-5102-4e55-aa5d-07099b500831/blazer-mid-77-vintage-mens-shoes-nw30B2.png"
  },
  { 
    id: 7, 
    name: "Air Jordan 1 High OG", 
    price: 10450, // Was $180
    category: "Basketball", 
    image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 8, 
    name: "Nike Air Huarache", 
    price: 7250, // Was $125
    category: "Lifestyle", 
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80" 
  },

  // --- ROW 3: PERFORMANCE & SPORT ---
  { 
    id: 9, 
    name: "Nike Zoom Fly 5", 
    price: 9295, // Was $160
    category: "Running", 
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 10, 
    name: "Nike Air Max 90", 
    price: 7550, // Was $130
    category: "Classic", 
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 11, 
    name: "Nike Free Run 5.0", 
    price: 5800, // Was $100
    category: "Running", 
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 12, 
    name: "Nike SB Chron 2", 
    price: 4950, // Was $85
    category: "Skateboarding", 
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=500&q=80" 
  }
]);

// --- COMPUTED ---
const cartTotal = computed(() => cart.reduce((total, item) => total + item.price, 0));

// --- NAVIGATION LOGIC ---
const navigateTo = (page, product = null) => {
  currentView.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (product) selectedProduct.value = product;
};

// --- CART LOGIC ---
// --- CART LOGIC ---
const addToCart = (product) => {
  cart.push({ ...product });
  isAnimatingCart.value = true;
  setTimeout(() => isAnimatingCart.value = false, 300);
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
};

// --- CHECKOUT LOGIC ---
const processOrder = () => {
  alert("Order Placed Successfully!");
  cart.length = 0; // Clear cart
  navigateTo('home');
};
</script>

<template>
  <div class="app-container">
    
    <NavBar 
      :currentView="currentView" 
      :cartCount="cart.length" 
      :isAnimating="isAnimatingCart" 
      @navigate="navigateTo" 
    />

    <main class="content-wrapper">
      
      <HomeView 
        v-if="currentView === 'home'" 
        @navigate="navigateTo" 
      />

      <ProductList 
        v-if="currentView === 'products'" 
        :products="products" 
        @view-details="(p) => navigateTo('details', p)" 
      />

      <ProductDetails 
        v-if="currentView === 'details'" 
        :product="selectedProduct" 
        @add-to-cart="addToCart" 
        @go-back="navigateTo('products')" 
      />

      <CartView 
        v-if="currentView === 'cart'" 
        :cart="cart" 
        @navigate="navigateTo" 
        @checkout="navigateTo('checkout')"
        @remove-item="removeFromCart"
      />

      <CheckoutView 
        v-if="currentView === 'checkout'" 
        :total="cartTotal" 
        @confirm-order="processOrder" 
      />

    </main>

    <AppFooter />
    
  </div>
</template>

<style>
/* GLOBAL STYLES (Tokens) */
:root {
  --primary: #111111;
  --accent: #3b82f6;
  --bg: #f5f5f5;
  --surface: #ffffff;
  --text-main: #111111;
  --text-muted: #757575;
  --border: #e5e5e5;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', -apple-system, sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }

/* Sticky Footer Layout Fix */
.app-container { min-height: 100vh; display: flex; flex-direction: column; }
.content-wrapper { flex: 1; padding-top: 80px; width: 100%; }

/* Global Buttons used in sub-components */
.btn-primary {
  background: var(--primary); color: white; border: none; padding: 0.85rem 1.5rem;
  border-radius: 30px; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.btn-primary:hover { transform: scale(1.02); opacity: 0.9; }
.btn-primary:disabled { background: #999; cursor: not-allowed; transform: none; }
.btn-primary.large { padding: 1rem 2.5rem; font-size: 1.1rem; }
.btn-primary.full { width: 100%; }

.btn-secondary {
  background: white; border: 1px solid var(--border); padding: 0.75rem 1.5rem;
  border-radius: 30px; cursor: pointer; font-weight: 600;
}
</style>