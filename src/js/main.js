import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductListing.mjs";


const listElement = document.querySelector(".product-list");
const tentCategory = new ProductData("tent");
const tentDataSource = tentCategory.getData();

const productListing = new ProductListing(category, dataSource, listElement);

productListing.init();

console.table(tentDataSource);