document.addEventListener("DOMContentLoaded", getProtected);

async function getProtected() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:3000/auth/admin", {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    });
    const data = await response.text();

    document.getElementById("greenting").textContent = data;
  } catch (error) {
    alert(`Error: ${error}`);
  }
}
