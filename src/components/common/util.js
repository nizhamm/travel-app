 export const dateFormatter = (val) => {
    let formattedDate;
    let date = new Date(Date.parse(val));
    formattedDate = `${date.getDate()}-${date.toLocaleString("default", {
      month: "long",
    })}-${date.getFullYear()}`;
    return formattedDate;
  };