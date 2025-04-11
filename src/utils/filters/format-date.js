import { DateTime } from "luxon";
import "dotenv/config";

export const formatDate = (value, format = "dd.MM.yyyy") => {
  const dateObject = DateTime.fromISO(value);

  return dateObject.setLocale("de").toFormat(format);
};
