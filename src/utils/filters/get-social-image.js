export const getSocialImageFilter = (imgObj, options = { fill: "face" }) => {
  const imgId = imgObj.sys.id;

  return `/assets/images/ctfl/${imgId}-1200x492-1200w-fill-${options.fill}.webp`;
};
