<script setup>
const emit = defineEmits(['navigate']);
</script>

<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1>Just Do <br><span class="highlight">It.</span></h1>
      <p>Engineered for speed, designed for comfort. Experience the next evolution of motion.</p>
      <button class="btn-primary large" @click="$emit('navigate', 'products')">Shop New Arrivals</button>
    </div>
    <div class="hero-image">
       <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80" alt="Nike Running">
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  display: flex; align-items: center; justify-content: space-between; max-width: 1200px;
  margin: 2rem auto; padding: 2rem; gap: 2rem;
}
.hero-content h1 { font-size: 4rem; line-height: 0.95; margin-bottom: 1.5rem; font-weight: 900; letter-spacing: -2px; text-transform: uppercase; }
.highlight { color: var(--text-main); }
.hero-image img { border-radius: 20px; width: 100%; max-width: 600px; transform: rotate(-5deg); transition: transform 0.5s; }
.hero-image img:hover { transform: rotate(0deg) scale(1.05); }

@media (max-width: 768px) {
  .hero-section { flex-direction: column-reverse; text-align: center; }
}
</style>