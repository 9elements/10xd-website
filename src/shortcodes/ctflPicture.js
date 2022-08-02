/*
This shortcode can be used for images loaded from Contentful.
It generates a <picture> with all the formats and widths defined in the shortcode.

Required properties:
  - imgObj -> The whole image object from contentful (not just the URL!)

Not required, but recommended:
  - alt -> alt for the image (works with ""). Defaults to the image's title defined in Contentful
  - imgWidth -> The width of the image requested from contentful. Defaults to 800
  - imgHeight -> The height of the image requested from contentful. Defaults to 600
  !! if you define either imgWidth or imgHeight, the other one will be calculated based on the image's
  dimensions taken from contentful. If you specify both, the image will be resized. !!

Optional properties:
  - formats -> The image formats generated for the picture. Defaults to ["avif", "webp", "jpg"]
  - widths -> all the widths for the picture elements. Works with [none]. Defaults to [300, 600]
  - sizes -> defines the sizes for the picture. Defaults to "(min-width: 22em) 30vw, 100vw"
  - classes -> add some classes
  - fit -> if you reisze the image this defines how it should be resized. Defaults to "fill"

Basic usage:
{% ctflPicture imgObj = myImage, alt="ctfl image", imgWidth="800", imgHeight="600" %}

Thumbnail example:
{% ctflPicture
  imgObj = myImage,
  alt="Avatar",
  imgWidth="32",
  imgHeight="32",
  fit="thumb",
  widths=[32],
  sizes="2rem"
%}

*/

const eleventyImage = require("@11ty/eleventy-img");

async function ctflPictureShortcode(ctflImage) {
  let imgObj = ctflImage.imgObj;
  let imgUrl = imgObj.fields.file.url;
  let imgId = imgObj.sys.id;
  let alt = ctflImage.alt || imgObj.fields.title;
  let formats = ctflImage.formats;
  let widths = ctflImage.widths || [300, 600];
  let sizes = ctflImage.sizes;
  let classes = ctflImage.classes;
  let fit = ctflImage.fit ? ctflImage.fit : "fill";

  let imgWidth = 800;
  let imgHeight = 600;

  if (ctflImage.imgWidth && ctflImage.imgHeight) {
    imgWidth = ctflImage.imgWidth;
    imgHeight = ctflImage.imgHeight;
  }

  let originSizes = imgObj.fields.file.details.image;
  let ratio = originSizes.width / originSizes.height;

  if (ctflImage.imgWidth && !ctflImage.imgHeight) {
    let calculatedHeight = Math.floor(ctflImage.imgWidth / ratio);
    imgWidth = ctflImage.imgWidth;
    imgHeight = calculatedHeight;
  }

  if (!ctflImage.imgWidth && ctflImage.imgHeight) {
    let calculatedWidth = Math.floor(ctflImage.imgHeight * ratio);
    imgHeight = ctflImage.imgHeight;
    imgWidth = calculatedWidth;
  }

  if (imgUrl.startsWith("//")) {
    imgUrl = "https:" + imgUrl;
  }

  imgUrl = imgUrl + "?fit=" + fit + "&w=" + imgWidth + "&h=" + imgHeight;

  let options;

  options = {
    formats: formats || ["avif", "webp", "jpg"],
    widths: widths,
    urlPath: "/images/ctfl",
    outputDir: "dist/images/ctfl",
    filenameFormat: function (id, src, width, format, options) {
      return `${imgId}-${imgWidth}x${imgHeight}-${width}w-${fit}.${format}`;
    },
  };

  let stats;
  if (process.env.ELEVENTY_SERVERLESS) {
    stats = eleventyImage.statsByDimensionsSync(
      imgUrl,
      imgWidth,
      imgHeight,
      options
    );
  } else {
    stats = await eleventyImage(imgUrl, options);
  }

  return eleventyImage.generateHTML(stats, {
    alt,
    loading: "lazy",
    decoding: "async",
    sizes: sizes || "(min-width: 22em) 30vw, 100vw",
    class: classes || "",
  });
}

module.exports = ctflPictureShortcode;
