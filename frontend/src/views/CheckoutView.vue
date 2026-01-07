<script setup>
import { reactive, computed, ref } from 'vue';

const props = defineProps({
  total: Number
});

const emit = defineEmits(['confirm-order']);

const showConfirmModal = ref(false);

const form = reactive({
  email: '',
  name: '',
  address: '',
  card: '',
  expiry: '',
  cvc: ''
});

const errors = reactive({});

// Validation Logic
const validate = (field) => {
  if (field === 'email') {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    errors.email = valid ? null : "Invalid email format";
  }
  if (field === 'name') {
    const valid = form.name.length > 2;
    errors.name = valid ? null : "Name must be at least 3 chars";
  }
  if (field === 'card') {
    const valid = form.card.length === 19; 
    errors.card = valid ? null : "Incomplete number";
  }
  if (field === 'cvc') {
    const valid = form.cvc.length === 3;
    errors.cvc = valid ? null : "3 digits";
  }
};

// Input Formatters
const formatCard = (e) => {
  let val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  form.card = val;
  validate('card');
};

const formatCVC = (e) => {
  let val = e.target.value.replace(/\D/g, '').slice(0, 3);
  form.cvc = val;
  validate('cvc');
};

const formatName = (e) => {
  let val = e.target.value.replace(/[0-9]/g, ''); 
  form.name = val;
  validate('name');
};

const isFormValid = computed(() => {
  return form.email && !errors.email &&
         form.name && !errors.name &&
         form.address &&
         form.card && !errors.card &&
         form.cvc && !errors.cvc;
});

const initiateCheckout = () => {
  if (isFormValid.value) showConfirmModal.value = true;
};
</script>

<template>
  <section class="page-section checkout-view">
    <div class="checkout-card">
      <div class="checkout-header">
        <h2>Secure Checkout</h2>
        <p>Enter your details below.</p>
      </div>

      <form @submit.prevent="initiateCheckout">
        <div class="form-group">
          <label>Email Address</label>
          <input v-model="form.email" @blur="validate('email')" type="email" placeholder="you@example.com" class="styled-input" :class="{ 'has-error': errors.email, 'is-valid': form.email && !errors.email }">
          <span class="error-msg" v-if="errors.email">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label>Full Name</label>
          <input v-model="form.name" @input="formatName" type="text" placeholder="Jane Doe" class="styled-input" :class="{ 'has-error': errors.name, 'is-valid': form.name && !errors.name }">
          <span class="hint" v-if="!errors.name">Numbers are not allowed.</span>
        </div>

        <div class="form-group">
          <label>Address</label>
          <input v-model="form.address" type="text" class="styled-input">
        </div>

        <div class="form-group">
          <label>Card Details</label>
          <div class="card-input-wrapper">
            <input :value="form.card" @input="formatCard" type="text" placeholder="0000 0000 0000 0000" maxlength="19" class="styled-input" :class="{ 'has-error': errors.card, 'is-valid': form.card && !errors.card }">
          </div>
          <span class="error-msg" v-if="errors.card">{{ errors.card }}</span>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Expiry</label>
            <input v-model="form.expiry" type="text" placeholder="MM/YY" class="styled-input" maxlength="5">
          </div>
          <div class="form-group">
            <label>CVC</label>
            <input :value="form.cvc" @input="formatCVC" type="text" placeholder="123" class="styled-input" :class="{ 'has-error': errors.cvc, 'is-valid': form.cvc && !errors.cvc }">
          </div>
        </div>

        <button type="submit" class="btn-primary full mt-4" :disabled="!isFormValid">
          {{ isFormValid ? `Pay $${total}` : 'Complete Form to Pay' }}
        </button>
      </form>
    </div>

    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirm Order</h3>
        <p>You are about to pay <b>${{ total }}</b>. Is this correct?</p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="showConfirmModal = false">Cancel</button>
          <button class="btn-primary" @click="$emit('confirm-order')">Yes, Pay Now</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-section { max-width: 1200px; margin: 0 auto; padding: 2rem; display: flex; justify-content: center; }
.checkout-card { background: white; padding: 3rem; border-radius: 16px; width: 100%; max-width: 550px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 1.5rem; }
.styled-input { width: 100%; padding: 0.85rem; border: 1px solid #e5e5e5; border-radius: 8px; font-size: 1rem; }
.styled-input.has-error { border-color: #ef4444; background: #fff5f5; }
.styled-input.is-valid { border-color: #10b981; background: #f0fdf4; }
.error-msg { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
.hint { color: #757575; font-size: 0.8rem; margin-top: 4px; display: block; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal { background: white; padding: 2rem; border-radius: 12px; max-width: 400px; text-align: center; }
.modal-actions { display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: center; }
</style>