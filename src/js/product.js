import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


// display product details in the console
const productId = getParams("product")
const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();


// add to cart button event handler
/*async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);




//test findProductById function
console.log(dataSource.findProductById(productId));*/

