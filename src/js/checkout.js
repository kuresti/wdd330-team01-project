import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");

myCheckout.init();
myCheckout.setExpirationPeriod();
myCheckout.formValidation();

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
