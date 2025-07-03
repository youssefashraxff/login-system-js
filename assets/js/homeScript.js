var welcomeMsg = document.getElementById("welcome-msg");
loggedInName = JSON.parse(localStorage.getItem("loggedInUser"));

welcomeMsg.innerHTML = `Welcome, <span class="fw-light fs-3">${loggedInName.signupName}</span>`;

function onLogoutClicked() {
  location.href = "index.html";
}
