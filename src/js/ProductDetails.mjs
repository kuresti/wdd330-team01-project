import { getLocalStorage, setLocalStorage, getItemFromUrl, buildPrice, alertMessage} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import setCartSup from "./cartsuperscript.js";
import cartAnimation from "./cartAnimation.js";
const dataSource = new ExternalServices("tents");

var productcolorimg;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function createPage(item) {
  if (item == null) {
    return "";
  }
  let color = item["Colors"];
  productcolorimg = item["Colors"][0].ColorPreviewImageSrc
  let brand = item["Brand"].Name;
  let pricedata = buildPrice(item);
  let discount = 0;

  if (item["SuggestedRetailPrice"] >= item["FinalPrice"]) {
    discount = (item["SuggestedRetailPrice"] - item["FinalPrice"]).toFixed(2);
    document.getElementById('discountflag').innerHTML = `$${discount} off!`;
  }

  const htmlItem = `
    <h3>${brand}</h3>

    <h2 class="divider">${item["Name"]}</h2>

    <div id=productimagediv>
    <img class="divider" id=productimage src="${productcolorimg}" alt="${item["Name"]}" />
    </div>
    <div id="colorlist"></div>

            ${pricedata}

            <p class="product__color" id="productcolorname">${color[0].ColorName}</p>

            <p class="product__description">
              ${item["DescriptionHtmlSimple"]}
            </p>
            <div class="product-detail__add">
              <button id="addToCart" data-id="${item["Id"]}">Add to Cart</button>
            </div>
    `;
    return htmlItem;
}

function commentTemplate(item) {
  if (item == null) {
    return "";
  }

  const newItem = `<li class="comment-box-display">
  <div class="">
  <textarea class="comment-box-display" readonly>${item}</textarea>
  </div>
</li>`;

  return newItem;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init(){
   
    this.reviews = getLocalStorage(this.productId);
    this.product = await this.dataSource.findProductById(this.productId);
    
    this.renderProductDetails("main");
    this.renderProductComments("product-comments")
    
    document.getElementById("addToCart").addEventListener("click", this.addToCartHandler.bind(this));
    document.getElementById("post-comment").addEventListener("click", this.postComment.bind(this));
    this.renderColorList(this.product);
  }

  renderProductComments(selector){
    const element = document.getElementById(selector);
    if(this.reviews == null)
    {
      return;
    }
    const comments = this.reviews.split(',');
    const htmlItems = comments.map((o) => commentTemplate(o));
    document.getElementById(selector).innerHTML = htmlItems.join("");
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      createPage(this.product)
    );
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }


  async getPage(id) {
    const product = await this.findProductById(id);
    const reviews = await dataSource.getReviews(id);
    return createPage(product);
  }

  
  async addToCartHandler(e) {
    var product = await dataSource.findProductById(e.target.dataset.id);
    let color = document.getElementById("productcolorname").innerText;
    let image = productcolorimg;
    await this.addProductToCart(product, image, color);
    alertMessage("Item added to cart!", false);
  }
  
  async postComment(e) {
    const form = document.forms[0];
    let formData = new FormData(form);
    let comment = formData.get("user-comments");
    await this.addCommentToStorage(this.productId, comment);
    this.reviews = getLocalStorage(this.productId);
    this.renderProductComments("product-comments")
    
  }

  async addProductToCart(product, image, color) {

    product["Images"] = image;
    product["Colors"] = color;
  
    
    const cartItems = [getLocalStorage("so-cart")];
    let objArr = new Array;
    let newCart = new Array;
  
    
    if (cartItems[0] != null) {
      let items = cartItems[0].flat(10);
      objArr = items.map((x) => JSON.parse(x));
    }
  
    
    if (objArr[0] == null) {
      objArr.shift();
    }
  
    
    if (objArr.length > 0) {
      for (let x in objArr) {
        newCart.push(JSON.stringify(objArr[x]));
      }
  
      newCart.push(JSON.stringify(product));
    }
    
    else {
      newCart = [JSON.stringify(product)];
    }
    
    
    setLocalStorage("so-cart", newCart);
    
    
    setCartSup();
    cartAnimation();
    
  }

  async addCommentToStorage(key, comment) {
    const commentItems = [getLocalStorage(key)];
    if(commentItems[0] != null)
    {
      commentItems.push(comment);
      var stringContent = commentItems.join(',');
    }
    else
    {
      var stringContent = comment;
    }
    
    
    setLocalStorage(key, stringContent);
  }
  
  renderColorList(item){
    var colors = item["Colors"];
    var colorlist = ``;
    var color;
    for (let i = 0; i < colors.length; i++){
      color = `<img id ="itemcolor${i}" src = "${colors[i].ColorChipImageSrc}"/>`;
      colorlist = colorlist + color;
    }
    document.getElementById("colorlist").innerHTML = colorlist;
    for (let i = 0; i < colors.length; i++){
      document.getElementById(`itemcolor${i}`).addEventListener("click", function(){
        document.getElementById("productimagediv").innerHTML = `<img class="divider" id=productimage src="${colors[i].ColorPreviewImageSrc}" alt="${item["Name"]}" />`;
        document.getElementById("productcolorname").innerText = `${colors[i].ColorName}`;
        productcolorimg = colors[i].ColorPreviewImageSrc;
      });
    }
  }
}
