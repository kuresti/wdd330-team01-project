import { 
    getLocalStorage, 
    setLocalStorage, 
    alertMessage, 
    removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    //using Object.fromEntries instead of an empty object and for loop
    const formData = new FormData(formElement);

    const formDataJSONObj = Object.fromEntries(formData.entries());

    services.formatExpiration(formDataJSONObj);
    // const formData = new FormData(formElement);
    
    // const formDataJSONObj ={};
    // formData.forEach((value, key) => (formDataJSONObj[key] = value));
    return formDataJSONObj;

}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log("item: ", item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.Quantity,
        }
        });
    
    return simplifiedItems;
    
}


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.quantity = 0;
    }

    init(){
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {

       //calculate and display the total amount of the items in the cart, 
       //and the number of items in the cart 
       const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
       const itemNumberElement = document.querySelector(this.outputSelector + " #num-items");

       const itemsQuantity = this.list.map((item) => item.Quantity);
       this.quantity = itemsQuantity.reduce((sum, quantity) => sum + quantity);
       const amounts = this.list.map((item) => item.FinalPrice * item.Quantity);
       this.itemTotal = amounts.reduce((sum, itemPrice) => sum + itemPrice, 0);
       
       itemNumberElement.innerText = this.quantity;
       summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
    }

    calculateOrdertotal() {
        //calculate the shipping and tax amounts. then use them to 
        //along with the cart total to figure out the order total
        this.shipping = 10 + (2 * (this.quantity - 1));
        this.tax = (parseFloat(this.itemTotal) * .06).toFixed(2);
       
        this.orderTotal =  (parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(2);


        //display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        //once the totals are all calculated display them in the order summary page
        const shipping = document.querySelector(this.outputSelector + " #shipping");

        const tax = document.querySelector(this.outputSelector + " #tax");
        
        const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");

        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;        
        orderTotal.innerText = "$" + this.orderTotal;    
    }

    async checkout() {
        const formElement = document.forms["checkout"];

        const json = formDataToJSON(formElement);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        // console.log("json: ", json);
        
        try {
            await services.checkout(json);  // send API request
            
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");    
        } catch (err) {
            removeAllAlerts();  // get rid of preexisting alerts
            for (let message in err.message) {
                alertMessage(err.message[message]);
            }
        }
        
    }

    setExpirationPeriod() {
        let today = new Date();
        let year = today.getFullYear();
        let futureYear = year + 10;
        let month = today.getMonth() + 1;
        month = month < 10 ? "0" + month : month.toString();
        let currentMonth = year + "-" + month;
        let futureMonth = futureYear + "-" + month;
      
        document.getElementById("expiration").setAttribute("min", currentMonth);
        document.getElementById("expiration").setAttribute("max", futureMonth);
      }

    formValidation() {
        document.addEventListener("DOMContentLoaded", () => {
            const form = document.forms["checkout"];
            form.addEventListener("change", (event) => {
            const target = event.target;
            const errorMsg = event.srcElement.nextElementSibling;
            if (!target.checkValidity()) {
                errorMsg.classList.remove("hide");
            } else {
                errorMsg.classList.add("hide");
            }
            });
        });
    }

}