const express = require("express");
const hbs = require("hbs");
const app = express();

const fs = require("fs");

const PORT = process.env.PORT ? process.env.PORT : 3001;

app.set("view engine", "html");
app.engine("html", hbs.__express);
app.set("views", "./public");

app.use((req, res, next) => {
  next();
});

app.use(express.static("public"));
//app.use(express.static("swdist")); // service worker

app.get("/", (req, res) => {
  res.render("index.html");
});

/*
app.get("/icon.png", (req, res) => {
  const img = Buffer.from(require("./public/icon.json"));
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img);
});
*/

const listener = app.listen(PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

