<script setup>
import { useRouter } from 'vue-router';
import { inject, ref } from 'vue';

defineProps({
  cartCount: Number,
  isAnimating: Boolean
});

const router = useRouter();
const logout = inject('logout');

// State for Mobile Sidebar
const isMenuOpen = ref(false);

const go = (name) => {
  isMenuOpen.value = false; // Close sidebar when navigating
  router.push({ name: name });
};

const handleLogout = () => {
  isMenuOpen.value = false;
  logout();
};
</script>

<template>
  <nav class="fixed top-0 w-full h-[70px] z-50 bg-surface/85 backdrop-blur-md flex items-center justify-between px-[5%] border-b border-black/5">
    
    <div class="flex items-center gap-4">
      
      <button @click="isMenuOpen = true" class="md:hidden text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div class="font-black text-xl md:text-2xl cursor-pointer tracking-tighter italic text-primary shrink-0" @click="go('home')">
        NikeHCI<span class="text-accent">.</span>
      </div>
    </div>
    
    <div class="flex items-center gap-4 md:gap-8">
      
      <div class="hidden md:flex items-center gap-8">
        <a class="text-text-muted font-medium cursor-pointer transition-colors duration-200 hover:text-primary" @click="go('home')">Home</a>
        <a class="text-text-muted font-medium cursor-pointer transition-colors duration-200 hover:text-primary" @click="go('products')">New Releases</a>
        <button @click="logout" class="text-text-muted font-medium cursor-pointer transition-colors duration-200 hover:text-red-600">
          Log out
        </button>
      </div>

      <button 
        class="relative flex items-center bg-transparent border-none cursor-pointer text-text-main transition-transform duration-200 ease-out" 
        :class="{ 'scale-125 text-accent': isAnimating }"
        @click="go('cart')" 
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span v-if="cartCount > 0" class="absolute -top-1 -right-2 bg-primary text-white text-[0.7rem] px-1.5 py-0.5 rounded-full font-bold">
          {{ cartCount }}
        </span>
      </button>
    </div>

    <Transition name="fade">
      <div v-if="isMenuOpen" class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden" @click="isMenuOpen = false"></div>
    </Transition>

    <Transition name="slide">
      <div 
        v-if="isMenuOpen" 
        class="fixed top-0 left-0 h-screen w-[280px] bg-surface z-[70] shadow-2xl p-8 flex flex-col md:hidden overflow-y-auto"
        style="background-color: #ffffff;"
      >
        
        <div class="flex items-center justify-between mb-12">
          <div class="font-black text-2xl tracking-tighter italic text-primary">
            NikeHCI<span class="text-accent">.</span>
          </div>
          <button @click="isMenuOpen = false" class="text-text-muted hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="flex flex-col gap-6 text-xl font-bold text-primary">
          <a @click="go('home')" class="cursor-pointer hover:text-accent">Home</a>
          <a @click="go('products')" class="cursor-pointer hover:text-accent">New Releases</a>
          <a @click="go('cart')" class="cursor-pointer hover:text-accent flex items-center gap-2">
            Your Bag <span v-if="cartCount > 0" class="bg-primary text-white text-xs px-2 py-1 rounded-full">{{ cartCount }}</span>
          </a>
        </div>

        <div class="mt-auto pt-8 border-t border-gray-100">
          <button @click="handleLogout" class="flex items-center gap-2 text-text-muted font-semibold hover:text-red-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Log out
          </button>
        </div>

      </div>
    </Transition>

  </nav>
</template>

<style scoped>
/* Smooth Slide Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>