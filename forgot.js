// =======================================
// TapTrust Bank - Forgot Password (SAFE)
// =======================================

// Supabase config
const SUPABASE_URL = "https://lghhofyhzopfnibodsjw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaGhvZnloem9wZm5pYm9kc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTAzODEsImV4cCI6MjA4MTU2NjM4MX0.oTxQ7U5HcP9OO7rAuMN7awk1EQQn_TuDrL-AZ-uK-5w";

// Create client
const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Handle email submit
document.addEventListener("DOMContentLoaded", () => {
  const emailForm = document.getElementById("email-form");
  const emailInput = document.getElementById("email");

  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://taptrustbk-cyber.github.io/taptrustbank/reset.html",
    });

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert(
      "🔐 Security email sent.\n\nPlease check your inbox and follow the link to reset your password."
    );

    emailInput.value = "";
  });
});
