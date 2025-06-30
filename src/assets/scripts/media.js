import Masonry from "masonry-layout";

let grid = document.querySelector(".grid");
let msnry = new Masonry(grid, {
  itemSelector: ".grid-item",
  columnWidth: ".grid-sizer",
  percentPosition: true,
});

let url = location.href;
let tabFromUrl = url.split("#")[1];
let tabElement = document.querySelector(`#${tabFromUrl}`);

if (tabElement) {
  let currentTab = tabs[0];
  if (tabElement !== currentTab) {
    switchTab(currentTab, tabElement);
  }
}
