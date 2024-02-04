export const lnToBr = (content: string) =>
  content.replace(/(?:\r\n|\r|\n)/g, "<br>");
