function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class Alert {
  async getAlertData() {
    const response = await fetch("json/alert.json");
    const data = await convertToJson(response);
    return data;
  }

  renderMessage(msg) {
    const p = document.createElement("p");
    p.textContent = msg.message;
    p.style.backgroundColor = msg.background;
    p.style.color = msg.color;
    return p;
  }

  async displayAlert() {
    const main = document.querySelector("main");
    const alertElement = document.createElement("section");
    alertElement.classList.add("alert-list");
    const messages = await this.getAlertData();
    messages.forEach((msg) => {
      const alertMsg = this.renderMessage(msg);
      if (alertMsg) alertElement.appendChild(alertMsg);
    });
    main.prepend(alertElement);
  }
}
const alert = new Alert();
alert.displayAlert();
