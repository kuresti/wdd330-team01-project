document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.querySelector("#close-banner");
  const banner = document.querySelector("#banner");

  closeButton.addEventListener("click", () => {
    banner.style.display = "none";
  });
});
