// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCylrCrfJpzXb8hue7jMuJAny70kzWo59s",
  authDomain: "farm-buddy-c7a84.firebaseapp.com",
  projectId: "farm-buddy-c7a84",
  storageBucket: "farm-buddy-c7a84.appspot.com",
  messagingSenderId: "296944944243",
  appId: "1:296944944243:web:701110c9a21b41aea99606",
  measurementId: "G-GQZ3PFNVC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


// --- Side Nav ---
window.openSideNav = function() {
  const nav = document.querySelector("header ul");
  nav.style.display = "block";
  nav.style.backgroundColor = "#444";
};

window.closeSideNav = function() {
  const nav = document.querySelector("header ul");
  nav.style.display = "";
  nav.style.backgroundColor = "";
};

  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>No services booked yet.</p>";
      totalElement.textContent = "0";
      return;
    }

    cart.forEach((item, index) => {
      total += item.price;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <span>${item.name}</span>
        <span>GH₵${item.price}</span>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    totalElement.textContent = total;
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();

    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.textContent = cart.length;
  }

  // Make remove function accessible
  window.removeFromCart = removeFromCart;

  renderCart();

// --- Sign Up ---
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target[1].value;
  const password = e.target[2].value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created for " + userCredential.user.email);
  } catch (error) {
    alert(error.message);
  }
});

// --- Sign In ---
document.getElementById("signin-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Welcome back " + userCredential.user.email);
    window.location.href = "home.html"; // redirect
  } catch (error) {
    alert(error.message);
  }
});

// --- Sign Out ---
const signOutBtn = document.getElementById("signout-btn");
if (signOutBtn) {
  signOutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("Signed out!");
    window.location.href = "index.html";
  });
}

// --- Toggle Forms ---
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");
const showSigninBtn = document.getElementById("show-signin");
const showSignupBtn = document.getElementById("show-signup");

showSigninBtn.addEventListener("click", () => {
  signinForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  showSigninBtn.classList.add("active");
  showSignupBtn.classList.remove("active");
});

showSignupBtn.addEventListener("click", () => {
  signupForm.classList.remove("hidden");
  signinForm.classList.add("hidden");
  showSignupBtn.classList.add("active");
  showSigninBtn.classList.remove("active");
});


