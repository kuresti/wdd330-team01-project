import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

// display product details in the console
loadHeaderFooter();

const dataSource = new ExternalServices();
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);

product.init();
