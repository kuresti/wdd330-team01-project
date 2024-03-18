import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachRemoveEventListeners();
  attachIncrementEventListeners();
  attachDecrementEventListeners();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image || item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity-controls">
  <button type="button" class="quantity-increment" data-index="${item.Quantity}">+</button>
  <span class="quantity">qty: ${item.Quantity}</span>
  <button type="button" class="quantity-decrement">-</button>
  
  </div>

  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item" data-index="${index}">X</button>
</li>`;

  return newItem;
}

function attachRemoveEventListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      removeItemFromCart(index);
    });
  });
}

function attachIncrementEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    const incrementButtons = document.querySelectorAll(".quantity-increment");
    incrementButtons.forEach((increment) => {
      increment.addEventListener("click", () => {
        increment.nextElementSibling.textContent =
          parseInt(increment.nextElementSibling.textContent) + 1;

        getTotal();
      });
    });
  });
}

function attachDecrementEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    const decrementButtons = document.querySelectorAll(".quantity-decrement");
    decrementButtons.forEach((decrement) => {
      decrement.addEventListener("click", () => {
        if (parseInt(decrement.previousElementSibling.textContent) > 1) {
          decrement.previousElementSibling.textContent =
            parseInt(decrement.previousElementSibling.textContent) - 1;

          getTotal();
        }
      });
    });
  });
}

async function getTotal() {
  try {
    const cartItems = await getLocalStorage("so-cart");

    if (cartItems && cartItems.length > 0) {
      document.querySelector(".cart-footer").classList.remove("hide");

      let total = 0;
      let quantities = document.querySelectorAll(".quantity");
      cartItems.forEach((item, i) => {
        total += item.FinalPrice * parseInt(quantities[i].outerText);
      });
      // for (let i = 0; i < cartItems.length; i++) {
      //   total += (cartItems[i].FinalPrice) * parseInt(quantity[i].innerHTML);
      // }
      const element = document.querySelector(".cart-total");
      element.textContent = `Total: $${total}`;
    } else {
      document.querySelector(".cart-footer").classList.add("hide");
    }
  } catch (error) {
    console.error("Error checking cart for items:", error);
  }
}

function removeItemFromCart(index) {
  let cartItems = getLocalStorage("so-cart");
  cartItems.splice(index, 1); // Remove item from the array
  setLocalStorage("so-cart", cartItems); // Update local storage
  renderCartContents(); // Re-render the cart
  getTotal(); // Update total after removing item
}

renderCartContents();
getTotal();
loadHeaderFooter();
