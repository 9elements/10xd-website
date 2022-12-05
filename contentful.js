const fs = require("fs");

const ctflBoards = require("./ctfl/boards.js");
const ctflFormats = require("./ctfl/formats.js");

const ctflPageFormats = require("./ctfl/pageFormats.js");
const ctflPageHome = require("./ctfl/pageHome.js");
const ctflPageServices = require("./ctfl/pageServices.js");
const ctflPageLocations = require("./ctfl/pageLocations.js");
const ctflPagePress = require("./ctfl/pagePress.js");
const ctflTextPages = require("./ctfl/textPages.js");

// Create an Object to write the json files
// Object key will be the filename and the value will be the file's content
const ctflData = {
  boards: ctflBoards,
  formats: ctflFormats,
  pageFormats: ctflPageFormats,
  pageHome: ctflPageHome,
  pageLocations: ctflPageLocations,
  pageServices: ctflPageServices,
  pagePress: ctflPagePress,
  textPages: ctflTextPages,
};

// directory path
const dir = "src/_data/ctfl";

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
