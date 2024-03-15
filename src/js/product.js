import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

// display product details in the console
loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);

product.init();
