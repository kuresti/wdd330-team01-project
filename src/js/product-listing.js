import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
//first create an instance of our ProductData class.
const dataSource = new ProductData();
//then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");
//then create an instance f our ProductList class and send it the correct information.
const myList = new ProductListing(category, dataSource, listElement);
//finally call the init method to show our products
myList.init();


// const productData = new ProductData("tents");
// const productListElement = document.querySelector(".product-list"); // Make sure this element exists
// const productList = new ProductListing(
//   "tents",
//   productData,
//   productListElement,
// );

// // Initialize ProductListing to fetch data and render list
// productList.init();