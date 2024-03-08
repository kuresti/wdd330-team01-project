import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
  }

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
}

    async init() {
        const list = await this.dataSource.getData(this.category);
        const filteredList = this.filterTents(list);
        this.renderList(filteredList);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
      }

      filterTents(products) {
        const tentIds = ['880RR', '985RF', '985PR', '344YJ'];
    
        const filteredTents = products.filter(product => tentIds.includes(product.Id));
        
        return filteredTents;
      }
}
