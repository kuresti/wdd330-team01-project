import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// display product details in the console
const productId = getParams("product")
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

// add listener to Add to Cart button
// document.getElementById("addToCart").addEventListener("click", product.addToCartHandler);

// async function displayProduct(productId) {
//   const product = await dataSource.findProductById(productId);
//   console.table(product);
// }
// displayProduct(productId);

// console.table(dataSource.findProductById(productID));