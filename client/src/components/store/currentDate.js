const curr = new Date();
curr.setDate(curr.getDate());
const date = curr.toISOString().substring(0, 10);
const hours = curr.toLocaleTimeString("fr-FR").toString();

export { date, hours };
