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
    const main = document.querySelector("main");
    const section = document.createElement("section");
    section.classList.add("alert-list");
    const p = document.createElement("p");
    p.textContent = msg.message;
    p.style.backgroundColor = msg.background;
    p.style.color = msg.color;
    section.appendChild(p);
    main.prepend(section);
  }

  async displayAlert() {
    const alertElement = document.createElement("section");
    alertElement.classList.add("alert-list");
    const messages = await this.getAlertData();
    messages.map((msg) => this.renderMessage(msg));
  }
}
const alert = new Alert();
alert.displayAlert();
