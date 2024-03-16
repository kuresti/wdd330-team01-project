import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

// display product details in the console
loadHeaderFooter();

document.addEventListener("DOMContentLoaded", function () {
    const dataSource = new ProductData();
    const productId = getParams("product");
    // Instantiate ProductDetails after the DOM has loaded
    const product = new ProductDetails(productId, dataSource);

    product.init();
});

