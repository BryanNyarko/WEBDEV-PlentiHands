
function addToCart(serviceName, servicePrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Add service
  cart.push({ name: serviceName, price: servicePrice });
  
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update navbar cart count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
