<script setup>
defineProps({
  products: Array // We expect an array of shoes
});

const emit = defineEmits(['view-details']);
</script>

<template>
  <section class="page-section">
    <div class="section-header">
      <h2>Trending Now</h2>
      <p>The latest drops.</p>
    </div>
    
    <div class="grid">
      <article v-for="p in products" :key="p.id" class="product-card" @click="$emit('view-details', p)">
        <div class="img-wrapper">
          <img :src="p.image" :alt="p.name">
          <div class="overlay">Quick View</div>
        </div>
        <div class="card-details">
          <span class="category">{{ p.category }}</span>
          <h4>{{ p.name }}</h4>
          <p class="price">₱{{ p.price.toLocaleString() }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.page-section { max-width: 1200px; margin: 0 auto; padding: 2rem; animation: fadeIn 0.4s ease; }
.section-header { margin-bottom: 2rem; }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
.product-card { background: white; cursor: pointer; transition: all 0.3s ease; }
.product-card:hover { transform: translateY(-5px); }

.img-wrapper { height: 300px; background: #f6f6f6; position: relative; overflow: hidden; }
.img-wrapper img { width: 100%; height: 100%; object-fit: cover; mix-blend-mode: multiply; }

.overlay {
  position: absolute; bottom: 0; left: 0; right: 0; background: rgba(17,17,17,0.8);
  color: white; padding: 10px; text-align: center; font-size: 0.85rem;
  transform: translateY(100%); transition: transform 0.3s;
}
.product-card:hover .overlay { transform: translateY(0); }

.card-details { padding: 1rem 0; }
.category { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
.price { font-weight: 600; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>