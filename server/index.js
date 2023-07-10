import express from "express";
import cors from "cors";
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const flash = require("connect-flash");
import "./utils/db.js";
import UserRoute from "./router/userRouter.js";

const app = express();

//konfigurasi flash
// app.use(cookieParser("secret"));
// app.use(
//   session({
//     cookie: { maxAge: 6000 },
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(flash());

app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(3004, () =>
  console.log("Server up and running.... http://localhost:3004")
);
