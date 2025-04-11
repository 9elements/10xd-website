let close = document.querySelector("a.sticky__close");
let sticky = document.querySelector(".sticky");

close.addEventListener("click", (e) => {
  sticky.classList.add("closed");
});
