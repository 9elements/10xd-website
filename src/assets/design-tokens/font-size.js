// import { calculateTypeScale } from "utopia-core";
import { interpolate } from "../../utils/css/interpolate";

/**
 * Define your font-size scale here
 * You can use the `calculateTypeScale` function from `utopia-core` to generate a scale, visually customizable on https://utopia.fyi/type/calculator/ and copyable to your project in the "PostCSS" tab on the site
 */
export const fontSize = {
  "step--2": interpolate({ min: 12, max: 14 }),
  "step--1": interpolate({ min: 14, max: 16 }),
  "step-0": interpolate({ min: 18, max: 20 }),
  "step-1": interpolate({ min: 22, max: 35 }),
  "step-2": interpolate({ min: 30, max: 50 }),
  "step-3": interpolate({ min: 36, max: 70 }),
  "step-4": interpolate({ min: 40, max: 80 }),
};

/**
 * Example of using `calculateTypeScale` to generate a scale
 */

// calculateTypeScale({
//   minWidth: 320,
//   maxWidth: 1140,
//   minFontSize: 16,
//   maxFontSize: 20,
//   minTypeScale: 1.2,
//   maxTypeScale: 1.25,
//   positiveSteps: 5,
//   negativeSteps: 2,
//   prefix: "step",
// }).reduce(
//   (obj, item) => ({
//     ...obj,
//     ...{ [`step-${item.step}`]: item.clamp },
//   }),
//   {}
// );
