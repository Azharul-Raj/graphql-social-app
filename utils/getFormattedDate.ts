
const currentDate = new Date();

const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  };
  
  const formattedDate = currentDate.toLocaleString("en-US", options as any)
    .replace(",", "") // Remove the comma
    .replace(/\//g, "-"); // Replace slashes with dashes
  
  export default formattedDate;
  