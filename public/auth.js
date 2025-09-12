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
