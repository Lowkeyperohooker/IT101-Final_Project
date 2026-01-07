<script setup>
defineProps({
  product: Object
});

const emit = defineEmits(['add-to-cart', 'go-back']);
</script>

<template>
  <section class="page-section details-view">
    <button class="back-btn" @click="$emit('go-back')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Back
    </button>
    
    <div class="product-split">
      <div class="product-image-large">
        <img :src="product.image" class="detail-img" :alt="product.name">
      </div>
      
      <div class="product-info">
        <span class="tag">Best Seller</span>
        <h1>{{ product.name }}</h1>
        <h2 class="price-display">${{ product.price }}</h2>
        <p class="description">
          Expertly crafted for performance. Features Nike Air cushioning for all-day comfort 
          and premium leather overlays for durability.
        </p>
        
        <button class="btn-primary full" @click="$emit('add-to-cart', product)">
          Add to Cart — ${{ product.price }}
        </button>

        <div class="features">
          <div class="feature">🚚 Free Shipping</div>
          <div class="feature">↩️ 60-Day Returns</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-section { max-width: 1200px; margin: 0 auto; padding: 2rem; animation: fadeIn 0.3s ease; }
.product-split { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; margin-top: 1rem; }
.product-image-large img { width: 100%; border-radius: 12px; }
.tag { background: #111; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
.price-display { font-size: 2rem; margin: 0.5rem 0 1.5rem; }
.features { margin-top: 2rem; display: flex; gap: 2rem; color: var(--text-muted); font-size: 0.9rem; }
.back-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; font-weight: 600; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .product-split { grid-template-columns: 1fr; }
}
</style>