const baseURL = "https://wdd330-backend.onrender.com/";

async function convertToJson(res) {
  const data = await res.json()
  if (res.ok) {
    return data;
  } else {
    throw { name: "seervicesError", message: data};
  }
}

export default class ExternalServices {
  constructor(category) {     
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }

  formatExpiration(json) {
    let value = json["expiration"];
    const parts = value.split("-");
    value = `${parts[1]}/${parts[0].slice(-2)}`;
    json["expiration"] = value;
    return json;
  }
}
