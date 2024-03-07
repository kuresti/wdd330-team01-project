import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { qs } from "./utils.mjs";

function displayTemplate(product) {
    const brandName = product.Brand.Name;
    const nameNoBrand = product.NameWithoutBrand;
    const imageSrc = product.Image;
    const listPrice = product.ListPrice;
    const colorName = product.Colors[0].ColorName;
    const description = product.DescriptionHtmlSimple;
    const id = product.Id;

    return `
    <section class="product-detail">
        <h3>${brandName}</h3>

        <h2 class="divider">${nameNoBrand}</h2>

        <img
          class="divider"
          src="${imageSrc}"
          alt="${nameNoBrand}"
        />

        <p class="product-card__price">$${listPrice}</p>

        <p class="product__color">${colorName}</p>

        <p class="product__description">
          ${description}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${id}">Add to Cart</button>
        </div>
    </section>
    `
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId)
        this.renderProductDetails("main");
        qs("#addToCart").addEventListener("click", this.addToCart.bind(this));
    }

    addToCart() {
        const items = getLocalStorage("so-cart") || [];
        items.push(this.product);
        setLocalStorage("so-cart", items);
    }

    renderProductDetails(selector) {
        const element = qs(selector);
        element.insertAdjacentHTML("afterbegin", displayTemplate(this.product));
    }

}