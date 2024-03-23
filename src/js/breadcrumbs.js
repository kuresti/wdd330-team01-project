import ExternalServices from "./ExternalServices.mjs";
import { getItemFromUrl } from "./utils.mjs";

export default async function breadCrumbs() {
  
  const currentUrlCat = getItemFromUrl("category");
  const currentUrlId = getItemFromUrl("id");
  const data = new ExternalServices();
  const prodCat = await data.getData(currentUrlCat);
  let prodCatQuant = 0;

  
  for (let i = 0; i < prodCat.length; i++) {
    prodCatQuant++;
  }

  
  let breadCrumbsHtml = "";

  
  if (window.location.href.includes(currentUrlCat)) {
    
    breadCrumbsHtml =
      currentUrlCat.charAt(0).toUpperCase() +
      currentUrlCat.slice(1) +
      " -> " +
      "(" +
      prodCatQuant +
      ")";
  }

  
  if (window.location.href.includes("index.html?id")) {
   
    let currentCat = await data.findProductById(currentUrlId);
    
    let stringCat = currentCat.Category;
   
    breadCrumbsHtml =
      `<a href='/product-listing/index.html?category=${stringCat}'>` +
      stringCat.charAt(0).toUpperCase() +
      stringCat.slice(1);
  }
 
  document.querySelector(".breadcrumbs").innerHTML = breadCrumbsHtml;
}
