const eleventyImage = require('@11ty/eleventy-img');

const heroImage = async (data) => {
  let url;
  let stats;
  let options = {
    formats: ['png'],
    widths: ['1216'],
    urlPath: '/images/ctfl/meta',
    outputDir: 'dist/images/ctfl/meta',
  };
  if (data.format.fields !== undefined) {
    if (data.format.fields.image !== undefined) {
      url = data.format.fields.image.fields.file.url;
      // This uses contentful's image modification to get a png
      // with an aspect ratio of 2:1
      url = 'https:' + url + '?fm=png&fit=fill&w=1193&h=492';
      stats = await eleventyImage(url, options);
    }
  }

  if (url !== undefined) {
    return stats.png[0].url;
  } else {
    return false;
  }
};

module.exports = {
  eleventyComputed: {
    heroImageUrl: (data) => {
      return heroImage(data);
    }
  },
};
