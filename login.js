const supabaseUrl = "https://lghhofyhzopfnibodsjw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaGhvZnloem9wZm5pYm9kc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTAzODEsImV4cCI6MjA4MTU2NjM4MX0.oTxQ7U5HcP9OO7rAuMN7awk1EQQn_TuDrL-AZ-uK-5w";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseAnonKey
);

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 🔐 Sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  // 🔎 Check profile exists
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    alert("Profile not found. Contact support.");
    await supabase.auth.signOut();
    return;
  }

  // 🔁 Redirect
  if (profile.is_admin) {
    window.location.href = "admin.html";
  } else {
    window.location.href = "dashboard.html";
  }
});
