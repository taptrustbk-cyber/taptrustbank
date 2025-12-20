// ================================
// TapTrust Bank - Forgot Password
// ================================

// 1️⃣ Supabase credentials
const SUPABASE_URL = "https://lghhofyhzopfnibodsjw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaGhvZnloem9wZm5pYm9kc2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTAzODEsImV4cCI6MjA4MTU2NjM4MX0.oTxQ7U5HcP9OO7rAuMN7awk1EQQn_TuDrL-AZ-uK-5w";

// 2️⃣ Create Supabase client
const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// 3️⃣ Handle forgot password fo
