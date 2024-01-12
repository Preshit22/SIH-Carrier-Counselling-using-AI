const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.use(
  session({
    secret: "CgdsfdtfdgfcfdsrmnbSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./server/routes/appRoutes.js");
app.use("/", routes);

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
