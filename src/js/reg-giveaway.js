// Function to check if it's the first visit
function isFirstVisit() {
  return localStorage.getItem("visited") === null; // Check if 'visited' key exists in local storage
}

// Function to display the banner
function displayBanner() {
  document.getElementById("reg-banner").style.display = "block"; // Display the banner
}

// Function to set a flag indicating the visit
function setVisitedFlag() {
  localStorage.setItem("visited", "true"); // Set 'visited' key in local storage
}

// Check if it's the first visit and display the banner if it is
if (isFirstVisit()) {
  displayBanner();
  setVisitedFlag();
}
