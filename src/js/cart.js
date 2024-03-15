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
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
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

async function checkCartItems() {
  try {
    const cartItems = await getLocalStorage("so-cart");

    if (cartItems && cartItems.length > 0) {
      document.querySelector(".cart-footer").classList.remove("hide");
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].FinalPrice;
      }
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
  checkCartItems(); // Update total after removing item
}

renderCartContents();
checkCartItems();
loadHeaderFooter();
