const subscribeLink = document.getElementById("subscribe-link");
const enc = encodeURIComponent;
const mail = {
  to: "info@10xd.de",
  subject: enc("10xD Magazin Premium Abo"),
  body: enc(
    "Hallo, \r\n\r\nich möchte das 10xD Premium Abo kaufen. AGB, Datenschutzerklärung und Widerrufsrecht wurden gelesen und akzeptiert."
  ),
};
const subscriptionHref = `mailto:${mail.to}?subject=${mail.subject}&body=${mail.body}`;

const subscriptionCheckboxes = document
  .getElementById("subscription-checkboxes")
  .querySelectorAll("input[type='checkbox']");

let checkedBoxesCount = 0;

subscriptionCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    checkedBoxesCount += e.currentTarget.checked ? 1 : -1;

    // disable Link if checkboxes are not selected
    // https://www.scottohara.me/blog/2021/05/28/disabled-links.html
    if (checkedBoxesCount === subscriptionCheckboxes.length) {
      subscribeLink.removeAttribute("aria-disabled");
      subscribeLink.removeAttribute("role");
      subscribeLink.setAttribute("href", subscriptionHref);
    } else {
      subscribeLink.setAttribute("aria-disabled", "true");
      subscribeLink.setAttribute("role", "link");
      subscribeLink.removeAttribute("href");
    }
  });
});
