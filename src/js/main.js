import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productData = new ProductData("tents");
const productListElement = document.querySelector(".product-list"); // Make sure this element exists
const productList = new ProductListing(
  "tents",
  productData,
  productListElement,
);

loadHeaderFooter();

// Initialize ProductListing to fetch data and render list
productList.init();
