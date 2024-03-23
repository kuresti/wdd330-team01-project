import ExternalServices from "./ExternalServices.mjs";
const prodCat = ["tents", "backpacks", "sleeping-bags", "hammocks"];

export default async function createSearchList() {
  
  const prodData = new ExternalServices();
  try {
  
    let search_terms = new Array();
    let itemIds = new Array();
    let res = document.getElementById("result");
    let list = "";

    for (let i = 0; i < prodCat.length; i++) {
      
      const items = await prodData.getData(prodCat[i]);

      
      for (let x = 0; x < items.length; x++) {
        search_terms.push(items[x].Name);
        itemIds.push(items[x].Id);
      }
    }
    
    for (let i = 0; i < search_terms.length; i++) {
      list +=
        "<li>" +
        `<a href='/product_pages/index.html?id=${itemIds[i]}'>` +
        search_terms[i] +
        "<a/>" +
        "</li>";
      res.innerHTML = "<ul>" + list + "</ul>";
      res.style.display = "none";
    }
  } catch (error) {
    alert(
      "The site is having trouble updating inventory at this time. Please try back in a few minutes."
    );
  }

  const userSearch = document.getElementById("user-search");

  userSearch.addEventListener("keyup", () => {
    showSearchResults(userSearch);
  });

  function showSearchResults(input) {
    let filter = input.value.toUpperCase();

    let res = document.getElementById("result");
    let li = res.getElementsByTagName("li");

    if (input.value != "") {
      res.style.display = "";

      for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";

        } else {
          li[i].style.display = "none";
        }
      }

    } else {
      res.style.display = "none";
    }
  }
}
