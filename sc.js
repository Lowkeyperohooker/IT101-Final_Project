let cartCount = 0;
const badge = document.getElementById('cart-count');

function addToCart(btn) {
    // 1. Immediate Visual Feedback (Button State)
    // Don't wait for server. Assume success first (Optimistic UI).
    btn.classList.add('added');
    
    // 2. Update Global Context (Cart Icon)
    cartCount++;
    badge.textContent = cartCount;
    
    // HCI: Animation draws eye to the change
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);

    // 3. Reset Button State (The "Cool Down")
    // After 2 seconds, let them add another or reset.
    setTimeout(() => {
        btn.classList.remove('added');
    }, 2000);
}