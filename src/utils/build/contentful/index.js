import fs from "fs";
import path from "path";

import ctflBoards from "./data/boards.js";
import ctflFormats from "./data/formats.js";
import ctflMagazines from "./data/magazines.js";
import ctflArticles from "./data/articles.js";
import ctflMagazinePremiumAbo from "./data/magazinePremiumAbo.js";

import ctflPageFormats from "./data/pageFormats.js";
import ctflPageHome from "./data/pageHome.js";
import ctflPageServices from "./data/pageServices.js";
import ctflPageLocations from "./data/pageLocations.js";
import ctflPageMedia from "./data/pageMedia.js";
import ctflPageMembers from "./data/pageMembers.js";
import ctflTextPages from "./data/textPages.js";
import ctflPagePress from "./data/pagePress.js";
import ctflMediaPartner from "./data/mediaPartner.js";
import ctflCooperationPartner from "./data/cooperationPartner.js";
import ctflPageEnglisch from "./data/pageEnglisch.js";

// Create an Object to write the json files
// Object key will be the filename and the value will be the file's content
const ctflData = {
  boards: ctflBoards,
  formats: ctflFormats,
  pageFormats: ctflPageFormats,
  pageHome: ctflPageHome,
  pageLocations: ctflPageLocations,
  pageMedia: ctflPageMedia,
  pageMembers: ctflPageMembers,
  pageServices: ctflPageServices,
  textPages: ctflTextPages,
  pagePress: ctflPagePress,
  magazines: ctflMagazines,
  magazinePremiumAbo: ctflMagazinePremiumAbo,
  articles: ctflArticles,
  mediaPartner: ctflMediaPartner,
  cooperationPartner: ctflCooperationPartner,
  pageEnglisch: ctflPageEnglisch,
};

// directory path
const dir = path.resolve(process.cwd(), "src/_data/ctfl");

// create new directory
try {
  // first check if directory already exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("Directory is created.");
  } else {
    console.log("Directory already exists.");
  }
} catch (err) {
  console.log(err);
}

async function writeJson(fetchData, filename) {
  const ctflData = await fetchData();
  fs.writeFile(
    `src/_data/ctfl/${filename}.json`,
    JSON.stringify(ctflData),
    (err) => {
      // Checking for errors
      if (err) throw err;

      console.log("Done writing " + filename); // Success
    }
  );
}

Object.keys(ctflData).forEach((key) => {
  writeJson(ctflData[key], key);
});
