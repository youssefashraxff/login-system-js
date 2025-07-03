var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");

var signupName = document.getElementById("signup-name");
var signupEmail = document.getElementById("signup-email");
var signupPassword = document.getElementById("signup-password");

var emailError = document.getElementById("email-error");
var nameError = document.getElementById("name-error");
var passwordError = document.getElementById("password-error");
var emptyError = document.getElementById("empty-error");

var allAccounts = loadLocalStorage();

function onLoginClicked() {
  resetErrorClass();

  if (!checkEmptyInputs()) {
    emptyError.classList.remove("d-none");
    return;
  }

  if (!validateEmail()) {
    emailError.innerHTML = "Email must be username@example.com";
    emailError.classList.remove("d-none");
    return;
  }

  if (!validatePassword()) {
    passwordError.classList.remove("d-none");
    return;
  }

  if (!checkIfEmailExist()) {
    emailError.innerHTML = "Email not found.";
    emailError.classList.remove("d-none");
    return;
  }

  if (!checkPassword()) {
    passwordError.innerHTML = "Incorrect password.";
    passwordError.classList.remove("d-none");
    return;
  }
  console.log("logged in");

  location.href = "home.html";
}

function onTypingLoginEmail() {
  emailError.innerHTML = "";
}

function onTypingLoginPassword() {
  passwordError.innerHTML = "";
}

function onSignupClicked() {
  resetErrorClass(true);
  // Check if any inputs are empty
  if (!checkEmptyInputs(true)) {
    emptyError.classList.remove("d-none");
    return;
  }

  if (!validateName()) {
    nameError.classList.remove("d-none");
    return;
  }

  if (!validateEmail(true)) {
    emailError.innerHTML = "Email must be username@example.com";
    emailError.classList.remove("d-none");
    return;
  }

  if (!validatePassword(true)) {
    passwordError.classList.remove("d-none");
    return;
  }

  if (checkIfEmailExist(true)) {
    emailError.innerHTML = "Email already exists.";
    emailError.classList.remove("d-none");
    return;
  }

  signUp();
  location.href = "index.html";
}

function signUp() {
  var account = {
    signupName: signupName.value,
    signupEmail: signupEmail.value,
    signupPassword: signupPassword.value,
  };
  allAccounts.push(account);
  saveLocalStorage(allAccounts);
}
function resetErrorClass(signUp) {
  emailError.classList.add("d-none");
  passwordError.classList.add("d-none");
  emptyError.classList.add("d-none");
  if (signUp) {
    nameError.classList.add("d-none");
  }
}
function saveLocalStorage(accounts) {
  localStorage.setItem("allAccounts", JSON.stringify(accounts));
}

function loadLocalStorage() {
  var loadedAccounts = JSON.parse(localStorage.getItem("allAccounts"));
  return loadedAccounts ? loadedAccounts : [];
}

function checkIfEmailExist(signup) {
  for (var i = 0; i < allAccounts.length; i++) {
    if (signup) {
      if (allAccounts[i].signupEmail === signupEmail.value) {
        return true;
      }
    } else {
      if (allAccounts[i].signupEmail === loginEmail.value) {
        return true;
      }
    }
  }
  return false;
}

function checkPassword() {
  for (var i = 0; i < allAccounts.length; i++) {
    if (
      allAccounts[i].signupPassword === loginPassword.value &&
      allAccounts[i].signupEmail === loginEmail.value
    ) {
      localStorage.setItem("loggedInUser", JSON.stringify(allAccounts[i]));
      return true;
    }
  }
  return false;
}

function checkEmptyInputs(isSignup) {
  if (isSignup) {
    return (
      signupName.value.trim() !== "" &&
      signupEmail.value.trim() !== "" &&
      signupPassword.value.trim() !== ""
    );
  } else {
    return loginEmail.value.trim() !== "" && loginPassword.value.trim() !== "";
  }
}

function validateName() {
  var nameRegex = /^[A-Za-z\s]{6,15}$/;
  return nameRegex.test(signupName.value.trim());
}

function validateEmail(isSignup) {
  var emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return isSignup
    ? emailRegex.test(signupEmail.value.trim())
    : emailRegex.test(loginEmail.value.trim());
}

function validatePassword(isSignup) {
  var passwordRegex = /^[A-Za-z0-9@._#$]{8,20}$/;
  return isSignup
    ? passwordRegex.test(signupPassword.value.trim())
    : passwordRegex.test(loginPassword.value.trim());
}
