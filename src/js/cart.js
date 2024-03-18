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
  quantityEventListener();
}

function quantityEventListener() {
  document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");
    productList.addEventListener("click", (event) => {
      const target = event.target;

      if (
        target.classList.contains("quantity-increment") ||
        target.classList.contains("quantity-decrement")
      ) {
        const index = target.getAttribute("data-index");
        const quantityElem = target
          .closest(".cart-card__quantity-controls")
          .querySelector(".quantity");
        let quantity = parseInt(quantityElem.textContent);

        if (target.classList.contains("quantity-increment")) {
          quantity += 1;
        } else if (
          target.classList.contains("quantity-decrement") &&
          quantity > 1
        ) {
          quantity -= 1;
        }

        quantityElem.textContent = quantity;
        updateCartItemsQuantity(index, quantity); // update the quantity in localStorage
      }
    });
  });
}

function cartItemTemplate(item, index) {
  const newItem = `
  <li class="cart-card divider">
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
      <button type="button" class="quantity-increment" data-index="${index}">+</button>
      <span class="quantity">${item.Quantity}</span>
      <button type="button" class="quantity-decrement" data-index="${index}">-</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-index="${index}">X</button>
  </li>
`;

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

async function getTotal() {
  try {
    const cartItems = await getLocalStorage("so-cart");

    if (cartItems && cartItems.length > 0) {
      document.querySelector(".cart-footer").classList.remove("hide");

      let total = 0;
      // let quantities = document.querySelectorAll(".quantity");
      cartItems.forEach((item) => {
        total += item.FinalPrice * item.Quantity;
      });
      // for (let i = 0; i < cartItems.length; i++) {
      //   total += (cartItems[i].FinalPrice) * parseInt(quantity[i].innerHTML);
      // }
      const element = document.querySelector(".cart-total");
      element.textContent = `Total: $${total.toFixed(2)}`;
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

function updateCartItemsQuantity(index, newQuantity) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > index) {
    cartItems[index].Quantity = newQuantity; //update the quantity in localStorage
    setLocalStorage("so-cart", cartItems);
    renderCartContents(); //re-render the cart to reflect the updated quantity
    getTotal(); //Recalculate the total
  }
}

renderCartContents();
getTotal();
loadHeaderFooter();
