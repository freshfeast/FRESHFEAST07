let cart = [];

function login() {
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;
  if (email && pass) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("home-section").style.display = "block";
  } else {
    alert("Please enter email and password.");
  }
}

function signup() {
  const email = document.getElementById("signup-email").value;
  const pass = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;
  if (email && pass && pass === confirm) {
    alert("Signup successful! Please login.");
    switchTo("login");
  } else {
    alert("Check all fields. Passwords must match.");
  }
}

function switchTo(mode) {
  document.getElementById("login-section").style.display = mode === "login" ? "block" : "none";
  document.getElementById("signup-section").style.display = mode === "signup" ? "block" : "none";
}

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
}

function showSection(id) {
  const sections = [
    "home-subscription",
    "fruits",
    "vegetables",
    "about-us",
    "my-orders",
    "order-history",
    "contact",
    "cart-section",
    "earn-section"
  ];
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.style.display = "none";
  });
  const activeEl = document.getElementById(id);
  if (activeEl) activeEl.style.display = "block";
}

function showAll() {
  showSection("home-subscription");
  document.getElementById("fruits").style.display = "block";
  document.getElementById("vegetables").style.display = "block";
}

function showEarn() {
  showSection("earn-section");
  const earnBox = document.getElementById("earn-section");
  earnBox.innerHTML = `
    <h2>💰 Refer & Earn</h2>
    <p>Refer <strong>1 person</strong> – Earn <strong>₹200</strong></p>
    <p>Refer <strong>2 people</strong> – Earn <strong>₹500</strong></p>
    <p>Share your referral code/link to earn more!</p>
  `;
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartCount();
  alert(`${name} added to cart`);
}

function updateCartCount() {
  document.getElementById("view-cart-count").innerText = `(${cart.length})`;
}

function showCart() {
  showSection("cart-section");
  const cartBox = document.getElementById("cart-section");
  cartBox.innerHTML = `<h2>Your Cart</h2>`;

  if (cart.length === 0) {
    cartBox.innerHTML += `<p>Your cart is empty.</p>`;
    return;
  }

  let total = 0;
  let listHtml = "<ul>";
  cart.forEach((item, index) => {
    total += item.price;
    listHtml += `<li>${item.name} - ₹${item.price} 
    <span style="color:red; cursor:pointer;" onclick="removeFromCart(${index})">❌</span></li>`;
  });
  listHtml += "</ul>";
  cartBox.innerHTML += listHtml;
  cartBox.innerHTML += `<p><strong>Total: ₹${total}</strong></p>`;

  // WhatsApp Order Button
  let msg = encodeURIComponent(
    "Hi! I want to order from FreshFeast:\n" +
    cart.map(i => `• ${i.name} - ₹${i.price}`).join("\n") +
    `\nTotal: ₹${total}`
  );
  let whatsappLink = `https://wa.me/918074608712?text=${msg}`;
  cartBox.innerHTML += `<a href="${whatsappLink}" target="_blank">
    <button style="background-color:#25D366; color:white; padding:10px 20px; border:none; border-radius:5px; margin-top:10px;">
      Order via WhatsApp
    </button></a>`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  showCart();
}
