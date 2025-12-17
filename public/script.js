// ============================
// GLOBAL CART STATE
// ============================
let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
let cashback = parseInt(localStorage.getItem("cashback")) || 0;

// ============================
// UPDATE CART ICON
// ============================
function updateCartUI() {
  const cartEl = document.getElementById("cartCount");
  if (cartEl) cartEl.innerText = cartCount;
}

// ============================
// ADD TO CART
// ============================
function addToCart(amount) {
  cartCount++;
  cashback += amount;

  localStorage.setItem("cartCount", cartCount);
  localStorage.setItem("cashback", cashback);

  updateCartUI();
  loadDashboard();
  updateCheckout();

  // CART ANIMATION
  const cartBtn = document.querySelector(".cart-btn");
  if (cartBtn) {
    cartBtn.classList.add("cart-bounce");
    setTimeout(() => cartBtn.classList.remove("cart-bounce"), 400);
  }
}

// ============================
// DASHBOARD UPDATE
// ============================
function loadDashboard() {
  const savings = localStorage.getItem("cashback") || 0;
  const coupons = localStorage.getItem("cartCount") || 0;
  const membership = localStorage.getItem("membership") || "Free";
  const expiry = localStorage.getItem("expiry");

  if (document.getElementById("dashSavings"))
    document.getElementById("dashSavings").innerText = savings;

  if (document.getElementById("dashCoupons"))
    document.getElementById("dashCoupons").innerText = coupons;

  if (document.getElementById("dashMembership"))
    document.getElementById("dashMembership").innerText = membership;

  if (document.getElementById("dashValidity")) {
    if (expiry) {
      const daysLeft = Math.max(
        0,
        Math.ceil((new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24))
      );
      document.getElementById("dashValidity").innerText =
        daysLeft + " days remaining";
    } else {
      document.getElementById("dashValidity").innerText = "--";
    }
  }
}

// ============================
// CHECKOUT PAGE UPDATE
// ============================
function updateCheckout() {
  if (document.getElementById("checkoutCount"))
    document.getElementById("checkoutCount").innerText = cartCount;

  if (document.getElementById("checkoutSavings"))
    document.getElementById("checkoutSavings").innerText = cashback;
}

// ============================
// CHECKOUT ACTION
// ============================
function checkout() {
  alert("Purchase successful! 🎉");

  cartCount = 0;
  cashback = 0;

  localStorage.setItem("cartCount", 0);
  localStorage.setItem("cashback", 0);

  updateCartUI();
  loadDashboard();
  updateCheckout();
}

// ============================
// PROFILE & LOGIN
// ============================
function openProfile() {
  document.getElementById("profileModal").style.display = "flex";
}

function login() {
  const name = document.getElementById("username").value;
  const email = document.getElementById("useremail").value;

  if (!name || !email) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("username", name);
  localStorage.setItem("email", email);

  if (!localStorage.getItem("membership")) {
    localStorage.setItem("membership", "Free");
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    localStorage.setItem("expiry", expiry.toISOString());
  }

  alert("Logged in successfully!");
  document.getElementById("profileModal").style.display = "none";
  loadDashboard();
}

// ============================
// SEARCH
// ============================
function searchCoupons() {
  const input = document.getElementById("search");
  if (!input) return;

  const value = input.value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const text = product.textContent.toLowerCase();
    product.style.display = text.includes(value) ? "block" : "none";
  });
}


// ============================
// PAGE LOAD
// ============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  loadDashboard();
  updateCheckout();
});
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const lastSpinEl = document.getElementById("lastSpin");
const nextSpinEl = document.getElementById("nextSpin");
const spinInfo = document.getElementById("spinInfo");

let lastSpinDate = localStorage.getItem("lastSpinDate");

function checkSpinAvailability() {
  const clientViewed = sessionStorage.getItem("clientViewed");

  // Allow spin if client has not spun in THIS SESSION
  if (!clientViewed) {
    spinBtn.disabled = false;
    spinInfo.style.display = "none";
    return;
  }

  if (!lastSpinDate) return;

  const last = new Date(lastSpinDate);
  const next = new Date(last);
  next.setDate(next.getDate() + 7);

  spinInfo.style.display = "block";
  lastSpinEl.innerText = last.toDateString();
  nextSpinEl.innerText = next.toDateString();

  if (new Date() < next) {
    spinBtn.disabled = true;
  }
}


function spinWheel() {
  sessionStorage.setItem("clientViewed", "true");


  const rewards = [20, 50, 80, 100];
  const randomIndex = Math.floor(Math.random() * rewards.length);
  const rotation = randomIndex * 90 + 1440;

  wheel.style.transform = `rotate(${rotation}deg)`;

  // Save spin date
  const now = new Date();
  localStorage.setItem("lastSpinDate", now);
  lastSpinDate = now;

  // Show info AFTER spin
  spinInfo.style.display = "block";
  lastSpinEl.innerText = now.toDateString();

  const next = new Date(now);
  next.setDate(next.getDate() + 7);
  nextSpinEl.innerText = next.toDateString();

  spinBtn.disabled = true;

  // OPTIONAL: add reward to cashback
  let cashback = Number(localStorage.getItem("cashback") || 0);
  cashback += rewards[randomIndex];
  localStorage.setItem("cashback", cashback);
}

checkSpinAvailability();

function viewAllCoupons() {
  window.location.href = "all-coupons.html";
}
function goHome() {
  window.location.href = "index.html";
}
function navigateWithFade(url) {
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = url;
  }, 300);
}
