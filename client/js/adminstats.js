console.log("✅ adminstats.js loaded");

window.onload = async function () {
  try {
    console.log("🔥 window.onload triggered");

    const token = localStorage.getItem("token");
    console.log("🔐 Loaded token:", token);

    if (!token) throw new Error("No token found in localStorage");

    const res = await fetch("https://blood-bank-management-system-p5yt.onrender.com/api/adminstats", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log("🌐 Fetch status:", res.status);

    if (!res.ok) throw new Error("Failed to fetch dashboard stats");

    const data = await res.json();
    console.log("📊 Admin stats:", data);

    document.getElementById("donors").textContent = data.donors || 0;
    document.getElementById("recipients").textContent = data.recipients || 0;
    document.getElementById("requests").textContent = data.requests || 0;
  } catch (err) {
    console.error("❌ Error loading dashboard data:", err.message);
    alert("Failed to load admin stats.");
  }
};
