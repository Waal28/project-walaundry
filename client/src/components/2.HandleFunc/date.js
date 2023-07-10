const now = new Date();

const day = ("0" + now.getDate()).slice(-2);
const day2 = ("0" + (now.getDate() + 2)).slice(-2);
const month = ("0" + (now.getMonth() + 1)).slice(-2);

export const today = now.getFullYear() + "-" + month + "-" + day;
export const next2day = now.getFullYear() + "-" + month + "-" + day2;
