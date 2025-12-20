function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  // DEMO ACCOUNT (for now)
  if (email === "admin@taptrust.com" && password === "123456") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    error.innerText = "Invalid email or password";
  }
}
