// signup.js

async function signup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created! Check your email to confirm.");
  window.location.href = "login.html";
}
