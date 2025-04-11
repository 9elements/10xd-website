function removePremium() {
  // Remove premium class from all articles
  var articles = document.querySelectorAll(".magazine__article--premium");
  articles.forEach(function (article) {
    article.classList.remove("magazine__article--premium");

    // Remove the premium-content div
    article.querySelector(".premium-content").remove();

    article.querySelector(".premium-badge").remove();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is already authenticated
  var isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated === "true") {
    removePremium();
  }

  var buttons = document.querySelectorAll(".magazine__article--premium button");

  function checkPassword(event) {
    var enteredPassword = prompt("Premium Code eingeben:");

    if (enteredPassword === "10xDMag") {
      removePremium();

      // Store flag in localStorage
      localStorage.setItem("isAuthenticated", "true");
    } else {
      alert("Falscher Code – erneut eingeben oder Premium Abo kaufen.");
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", checkPassword);
  });
});
