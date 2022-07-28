const Image = require("@11ty/eleventy-img");
async function pictureShortcode(picture) {
  let src = picture.src;
  let alt = picture.alt;
  let widths = picture.widths ? picture.widths : [300, 600];
  let sizes = picture.sizes ? picture.sizes : "100vw";
  let imgOptions = picture.imgOptions ? picture.imgOptions : "";
  let imgClass = picture.class ? picture.class : "";
  let formats = picture.formats ? picture.formats : ["avif", "jpg"];
  let loading = picture.loading ? picture.loading : "lazy";

  if (src.startsWith("//")) {
    src = "https:" + src;
  }

  let options = "";

  if (imgOptions) {
    imgOptions.forEach((option, index) => {
      if (index == 0) {
        options = "?" + option;
      } else {
        options = options + "&" + option;
      }
    });
  }
  src = src + options;

  let metadata = await Image(src, {
    widths: widths,
    formats: formats,
    outputDir: "./dist/images/ctfl/",
    urlPath: "/images/ctfl/",
    cacheOptions: {
      // if a remote image URL, this is the amount of time before it fetches a fresh copy
      duration: "1d",
      // project-relative path to the cache directory
      directory: ".cache",
      removeUrlQueryParams: false,
    },
  });

  let imageAttributes = {
    class: imgClass,
    alt,
    sizes,
    loading: loading,
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = pictureShortcode;
