import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function setExpirationPeriod() {
  let today = new Date();
  let year = today.getFullYear();
  let futureYear = year + 10;
  let month = today.getMonth() + 1;
  month = month < 10 ? "0" + month : month.toString();
  let currentMonth = year + "-" + month;
  let futureMonth = futureYear + "-" + month;

  document.getElementById("expiration").setAttribute("min", currentMonth);
  document.getElementById("expiration").setAttribute("max", futureMonth);
}

setExpirationPeriod();

function formValidation() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.forms["checkout"];
    form.addEventListener("change", (event) => {
      const target = event.target;
      const errorMsg = event.srcElement.nextElementSibling;
      if (!target.checkValidity()) {
        errorMsg.classList.remove("hide");
      } else {
        errorMsg.classList.add("hide");
      }
    });
  });
}
formValidation();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");

myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const formElem = document.forms["checkout"];
  const isValid = formElem.checkValidity();
  if (!isValid) {
    formElem.reportValidity();
    return;
  }
  myCheckout.checkout();
});
