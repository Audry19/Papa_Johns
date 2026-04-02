/* =============================================
   PAPA JOHN'S — TABLE MENU SCRIPT
   To add more pizzas: push a new object to the
   PIZZAS array below. That's it.
   ============================================= */

const PIZZAS = [
  {
    name:        "The Works",
    ingredients: "Pepperoni · Sausage · Mushrooms · Green Peppers · Onions · Black Olives",
    price:       "AED 49.99",
    badge:       "BESTSELLER",
    img:         "images/pizza1.png",
  },
  {
    name:        "Garden Fresh",
    ingredients: "Spinach · Tomatoes · Red Onion · Banana Peppers · Roasted Garlic · Feta",
    price:       "AED 44.99",
    badge:       "VEGGIE",
    img:         "images/pizza2.png",
  },
  {
    name:        "Spicy Inferno",
    ingredients: "Double Pepperoni · Jalapeños · Banana Peppers · Hot Sauce · Mozzarella",
    price:       "AED 54.99",
    badge:       "🔥 HOT",
    img:         "images/pizza3.png",
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