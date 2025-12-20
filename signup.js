const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: window.location.origin + "/login.html"
    }
  });

  if (error) {
    alert("Signup failed: " + error.message);
    return;
  }

  alert("Account created! Please check your email to confirm.");
});
