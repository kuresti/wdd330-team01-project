import ProductData from "./ProductData.mjs";
import ProductListing from './ProductList.mjs';


const productData = new ProductData('tents');
const productListElement = document.querySelector(".product-list"); // Make sure this element exists
const productList = new ProductListing('tents', productData, productListElement);

// Initialize ProductListing to fetch data and render list
productList.init();

