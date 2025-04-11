import client from "../contentful-client.js";

//helper function to check if date is in the past
const dateInPast = function (firstDate, secondDate) {
  if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
};
const currentDate = new Date();

export default async () => {
  const formats = await client
    .getEntries({
      content_type: "format",
      order: "fields.startDate",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  formats.forEach((format) => {
    //check if Event is aleady over or not
    const formatDate = new Date(format.fields.startDateTime);
    if (dateInPast(formatDate, currentDate)) {
      format.fields.isOver = true;
    } else {
      format.fields.isOver = false;
    }
  });

  return formats;
};
