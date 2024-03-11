function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}
export default class Alert {
    async getAlertData(){
        const response = fetch("../json/alert.json");
        const data = await convertToJson(response);
        return data;
    }
    displayAlert() {
        const alertElement = document.createElement("section");
        alertElement.classList.add("alert-list");
        const alerts = this.getAlertData().map((alert) => )
    }

}