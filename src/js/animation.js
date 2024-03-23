const cartIcon = document.querySelector(".icon-animation");
const addToCartButtons = document.querySelectorAll("#addToCart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartIcon.classList.add("animate");

    setTimeout(() => {
      cartIcon.classList.remove("animate");
    }, 500);
  });
});
