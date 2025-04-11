const isAuthenticated = localStorage.getItem("isAuthenticated");

const checkPassword = () => {
  const enteredPassword = prompt("Premium Code eingeben:");

  if (enteredPassword === "10xDMag") {
    // Store flag in localStorage
    localStorage.setItem("isAuthenticated", "true");
  } else {
    alert("Falscher Code – erneut eingeben oder Premium Abo kaufen.");
    window.location.href = "/magazin";
  }
};

if (isAuthenticated !== "true") {
  checkPassword();
}
