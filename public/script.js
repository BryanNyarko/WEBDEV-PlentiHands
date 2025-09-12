
// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { 
  getAuth, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAI4GWCwyhQ8o5NatlfUXMxLiWP0InHuJU",
  authDomain: "plentihands-2d968.firebaseapp.com",
  projectId: "plentihands-2d968",
  storageBucket: "plentihands-2d968.firebasestorage.app",
  messagingSenderId: "956015881514",
  appId: "1:956015881514:web:0350e11e7977e15ad80253",
  measurementId: "G-PZ5KTF1F7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


// --- Sign Out ---
const signOutBtn = document.getElementById("signout-btn");

if (signOutBtn) {
  signOutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("Signed out!");
    window.location.href = "index.html";
  });
}


// Redirect if not logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // No user is signed in , bounce back to login
    window.location.href = "index.html";
  }
});

window.openServiceDescription = function(service) {
  window.location.href = "service-description.html?service=" + service;
}


// --- Side Nav ---
window.openSideNav = function() {
  const nav = document.querySelector("header ul");
  nav.style.display = "block";
  nav.style.backgroundColor = "#444";
};

window.closeSideNav = function() {
  const nav = document.querySelector("header ul");
  nav.style.display = "none";
  nav.style.backgroundColor = "";
};

//adding to cart functionality
 window.addToCart = function (serviceName, servicePrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Add service
  cart.push({ name: serviceName, price: servicePrice });
  
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

    // 3. Disable/fade the Book button
  const bookBtn = document.querySelectorAll(".description-book-btn");
  bookBtn.forEach( el => {
      el.disabled = true;
  el.style.opacity = "0.5";
  el.textContent = "Added";
  });


  // 4. Show checkout button
  const checkDisplay = document.querySelectorAll(".checkout-btn");
    checkDisplay.forEach( el => {
      el.style.display = "block";
    })
}

// Update navbar cart count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCount);



//sopen service description page
window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");

  if (service === "repairs") {
    document.getElementById("repair-description-container").style.display = "flex";
  } 
  else if (service === "delivery"){ document.getElementById("delivery-description-container").style.display = "flex";
  } else if (service === "cleaning"){ document.getElementById("cleaning-description-container").style.display = "flex";
  }
  else if (service === "events-org"){ document.getElementById("events-description-container").style.display = "flex";
  }
  else if (service === "gardening"){ document.getElementById("gardening-description-container").style.display = "flex";
  }
}




