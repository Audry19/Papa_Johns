/* =============================================
   PAPA JOHN'S — TABLE MENU SCRIPT
   To add more pizzas: push a new object to the
   PIZZAS array below. That's it.
   ============================================= */

const PIZZAS = [
  {
    name:        "The Works",
    ingredients: "Pepperoni · Sausage · Mushrooms · Green Peppers · Onions · Black Olives",
    price:       "$13.99",
    badge:       "BESTSELLER",
    color:       "#CC0000",
    // Placeholder: vivid food photo via picsum + seed
    img:         "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
  },
  {
    name:        "Garden Fresh",
    ingredients: "Spinach · Tomatoes · Red Onion · Banana Peppers · Roasted Garlic · Feta",
    price:       "$11.99",
    badge:       "VEGGIE",
    color:       "#006241",
    img:         "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
  },
  {
    name:        "Spicy Inferno",
    ingredients: "Double Pepperoni · Jalapeños · Banana Peppers · Hot Sauce · Mozzarella",
    price:       "$14.99",
    badge:       "🔥 HOT",
    color:       "#d4500a",
    img:         "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80",
  },
  {
    name:        "BBQ Chicken",
    ingredients: "Grilled Chicken · BBQ Sauce · Red Onion · Cilantro · Smoked Gouda",
    price:       "$14.49",
    badge:       "NEW",
    color:       "#7a3b00",
    img:         "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
  },
  {
    name:        "Margherita",
    ingredients: "Fresh Basil · San Marzano Tomatoes · Buffalo Mozzarella · Olive Oil",
    price:       "$10.99",
    badge:       "CLASSIC",
    color:       "#006241",
    img:         "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=600&q=80",
  },
];

let current = 0;
let isAnimating = false;

const elName        = document.getElementById('pizza-name');
const elIngredients = document.getElementById('pizza-ingredients');
const elImg         = document.getElementById('pizza-img');
const elBadge       = document.getElementById('pizza-badge');
const elPrice       = document.getElementById('pizza-price');
const elInfo        = document.querySelector('.pizza-info');
const elBtn         = document.getElementById('switch-btn');

/* ---------- INIT ---------- */
function init() {
  const p = PIZZAS[current];
  elImg.src         = p.img;
  elName.textContent        = p.name;
  elIngredients.textContent = p.ingredients;
  elBadge.textContent       = p.badge;
  elPrice.textContent       = p.price;
}

/* ---------- SWITCH ---------- */
function switchPizza() {
  if (isAnimating) return;
  isAnimating = true;

  const next = (current + 1) % PIZZAS.length;
  const p    = PIZZAS[next];

  // Button ripple
  addRipple(elBtn, event);

  // Fade info out
  elInfo.classList.add('fade-out');
  elPrice.classList.add('fade-out');

  // Fade pizza image out
  elImg.classList.add('fading');

  setTimeout(() => {
    // Swap content
    elName.textContent        = p.name;
    elIngredients.textContent = p.ingredients;
    elBadge.textContent       = p.badge;
    elPrice.textContent       = p.price;

    elImg.src = '';
    elImg.src = p.img;
    elImg.onload = () => {
      elImg.classList.remove('fading');
    };

    // Fade info back in
    elInfo.classList.remove('fade-out');
    elPrice.classList.remove('fade-out');

    current = next;

    setTimeout(() => { isAnimating = false; }, 300);
  }, 380);
}

/* ---------- RIPPLE EFFECT ---------- */
function addRipple(btn, e) {
  const rect   = btn.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height);
  const x      = (e && e.clientX ? e.clientX : rect.left + rect.width / 2)  - rect.left - size / 2;
  const y      = (e && e.clientY ? e.clientY : rect.top  + rect.height / 2) - rect.top  - size / 2;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

/* ---------- PRELOAD NEXT IMAGE ---------- */
function preloadNext() {
  const nextIdx = (current + 1) % PIZZAS.length;
  const img = new Image();
  img.src = PIZZAS[nextIdx].img;
}

/* ---------- START ---------- */
init();
setTimeout(preloadNext, 1000);
