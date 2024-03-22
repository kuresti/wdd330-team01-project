const baseURL = "http://server-nodejs.cit.byui.edu:3000/";

async function convertToJson(res) { 
  if (res.ok) {
    return res.json();
  } else {
    const jsonResponse = await res.json();
    throw {name: "servicesError", message: jsonResponse};
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
        "Content-Type": "applicaton/json"
      },
      body: JSON.stringify(payload)
    }
      fetch(baseURL, options);
  }
}
