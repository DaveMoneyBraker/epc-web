export const downloadFile = (
  fileData: string | any,
  filename = "file"
): void => {
  try {
    const blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.log("download file service error");
    console.log({ err });
    throw new Error("Sorry, error occurred wile downloading file");
  }
};
