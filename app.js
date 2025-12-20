/*************************************************
 * TapTrust Bank - app.js
 * Dashboard Logic + Supabase Auth Protection
 *************************************************/

/* ===============================
   1️⃣ AUTH CHECK (PROTECT DASHBOARD)
================================ */

document.addEventListener("DOMContentLoaded", async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Not logged in → go to login
    window.location.href = "login.html";
    return;
  }

  // Logged in → load user data
  loadUser(session.user);
  loadWallet(session.user.id);
  loadTransactions(session.user.id);
});


/* ===============================
   2️⃣ LOAD USER INFO
================================ */

async function loadUser(user) {
  const usernameEl = document.getElementById("username");
  if (usernameEl) {
    usernameEl.innerText = user.email;
  }
}


/* ===============================
   3️⃣ LOAD WALLET BALANCE
================================ */

async function loadWallet(userId) {
  const { data, error } = await supabase
    .from("wallets")
    .select("balance")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Wallet error:", error.message);
    return;
  }

  const balanceEl = document.getElementById("balance");
  if (balanceEl) {
    balanceEl.innerText = `$${Number(data.balance).toFixed(2)}`;
  }
}


/* ===============================
   4️⃣ LOAD TRANSACTIONS
================================ */

async function loadTransactions(userId) {
  const table = document.getElementById("transactionList");
  if (!table) return;

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender.eq.${userId},receiver.eq.${userId}`)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Transaction error:", error.message);
    return;
  }

  table.innerHTML = "";

  data.forEach(tx => {
    const isSend = tx.sender === userId;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${new Date(tx.created_at).toLocaleDateString()}</td>
      <td>${isSend ? "Send" : "Receive"}</td>
      <td class="${isSend ? "minus" : "plus"}">
        ${isSend ? "-" : "+"} $${tx.amount}
      </td>
      <td>${tx.status}</td>
    `;

    table.appendChild(row);
  });
}


/* ===============================
   5️⃣ SEND MONEY
================================ */

async function sendMoney() {
  const receiverEmail = prompt("Receiver email:");
  const amount = Number(prompt("Amount:"));

  if (!receiverEmail || amount <= 0) {
    alert("Invalid data");
    return;
  }

  const { data: { session } } = await supabase.auth.getSession();
  const senderId = session.user.id;

  // Get receiver ID
  const { data: receiver, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", receiverEmail)
    .single();

  if (error || !receiver) {
    alert("Receiver not found");
    return;
  }

  // Insert transaction
  const { error: txError } = await supabase.from("transactions").insert({
    sender: senderId,
    receiver: receiver.id,
    amount: amount,
    status: "completed"
  });

  if (txError) {
    alert("Transaction failed");
    return;
  }

  alert("Money sent successfully ✅");
  loadWallet(senderId);
  loadTransactions(senderId);
}


/* ===============================
   6️⃣ OPEN WALLET
================================ */

function openWallet() {
  alert("Wallet page coming next step 💼");
}


/* ===============================
   7️⃣ OPEN MARKET
================================ */

function openMarket() {
  alert("Market system coming next 🛒");
}


/* ===============================
   8️⃣ LOGOUT
================================ */

async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}
