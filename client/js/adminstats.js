console.log("✅ adminstats.js loaded");

window.onload = async function () {
  try {
    const token = localStorage.getItem("token");
    console.log("🔐 Loaded token:", token);

    const res = await fetch("https://blood-bank-management-system-p5yt.onrender.com/api/admin/adminstats", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log("🌐 Fetch status:", res.status);

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    const data = await res.json();
    console.log("📊 Fetched stats data:", data);

    // Update the dashboard counts
    document.getElementById("donors").textContent = data.donors || 0;
    document.getElementById("recipients").textContent = data.recipients || 0;
    document.getElementById("requests").textContent = data.requests || 0;

  } catch (err) {
    console.error("❌ Error loading dashboard data:", err.message);
  }
};
