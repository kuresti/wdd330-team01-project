function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class Alert {
  async getAlertData() {
    const response = await fetch("../json/alert.json");
    const data = await convertToJson(response);
    return data;
  }

  renderMessage(msg) {
    const p = document.createElement("p");
    p.textContent = msg.message;
    p.style.backgroundColor = msg.background;
    p.style.color = msg.color;
    
  }

  async displayAlert() {
    const main = document.querySelector("main");
    const alertElement = document.createElement("section");
    alertElement.classList.add("alert-list");
    const messages = await this.getAlertData();
    messages.map((msg) => {
      const alertMsg = this.renderMessage(msg);
      alertElement.appendChild(alertMsg);
      main.appendChild(alertElement);
    })
  }
}
const alert = new Alert();
alert.displayAlert();
