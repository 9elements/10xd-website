const Image = require("@11ty/eleventy-img");
let options = {
  widths: [300, 500],
  formats: ["jpeg"],
};

module.exports = (src) => {
  let metadata = Image.statsSync(src, options);
  console.log(metadata.jpeg[0].url);
  return `<p style="position: relative; z-index: 2;">${metadata.jpeg[0].url}</p>`;
};
