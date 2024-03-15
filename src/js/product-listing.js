import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
//first create an instance of our ProductData class.
const dataSource = new ProductData();
//then get the element we want the product list to render in
const element = document.querySelector(".product-list");
//then create an instance f our ProductList class and send it the correct information.
const listing = new ProductListing(category, dataSource, element);
//finally call the init method to show our products
listing.init();

// const productData = new ProductData("tents");
// const productListElement = document.querySelector(".product-list"); // Make sure this element exists
// const productList = new ProductListing(
//   "tents",
//   productData,
//   productListElement,
// );

// // Initialize ProductListing to fetch data and render list
// productList.init();
