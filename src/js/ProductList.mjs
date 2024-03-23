import { renderListWithTemplate, buildPrice } from "./utils.mjs";



function productCardTemplate(product) {
    return {data:`<li class="product-card">
    <a href="/product_pages/index.html?id=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name} "
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">${buildPrice(product)}</p></a>
  </li>`, Name:product.Name, ListPrice:product.ListPrice}
}             

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    
    async init() {
      
      const list = await this.dataSource.getData(this.category);
      
      await this.renderList(list);

      document.querySelector(".title").innerHTML = this.category;
    }


    renderList(list) {
        
       const listIds = ["880RR", "985RF", "985PR", "344YJ"]
        const idArray = [];
        for (let i in list) {
            if (listIds.includes(list[i].Id)) {
                idArray.push(list[i]);
            }
        
        }
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}