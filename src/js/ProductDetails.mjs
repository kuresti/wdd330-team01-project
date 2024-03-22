
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";


function productDetailsTemplate(product){
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
                <h2 class="divider">${product.NameWithoutBrand}</h2>
                <img
                    class="divider"
                    src=${product.Images.PrimaryLarge}
                    alt=${product.NameWithoutBrand}
                    />
                <p class="product-card__price">$${product.FinalPrice}</p>
                <p class="product__color">${product.Colors[0].ColorName}</p>
                <p class="product__description">
                ${product.DescriptionHtmlSimple}
                </p>
                <div class="product-detail__add">
                    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
                </div></section>`;
}


export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductDetails("main");
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document
          .getElementById("addToCart")
          .addEventListener("click", this.addToCart.bind(this));
      }

    addToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        const productIndex = cartItems.findIndex((item)=> item.Id === this.product.Id);
        
        // If product is already in the cart
        if (productIndex !== -1) {
            // Show confirm dialog to the user
            const userConfirmed = confirm("You have this item in your cart already.  Do you want to add another?");

            if (userConfirmed) { //If user clicks ok, increment quantity
                cartItems[productIndex].Quantity = (cartItems[productIndex].Quantity || 0) + 1; // if quntity = null/0/undefined/Nan, use 1 instead
                alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
            }
            
        } else {
            // If product is not in the cart, add it with quantity of 1
            this.product.Quantity = 1;
            cartItems.push(this.product);
            alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
            }
        setLocalStorage("so-cart", cartItems);
        }
        
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
          "afterBegin",
          productDetailsTemplate(this.product)
        );
    }
}   
    
    

  
