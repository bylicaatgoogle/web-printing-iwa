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

app.get("/.well-known/manifest.webmanifest", (req, res) => {
  res.setHeader("Content-Type", "application/manifest+json");
  res.json({
    id: "/",
    short_name: "Web Printing IWA 2",
    name: "Web Printing IWA 2",
    version: "0.1.2",
    icons: [
      {
        src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPgogIDxnIGZpbGw9ImN1cnJlbnRDb2xvciI+CiAgICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTEiIHg9IjIiIHk9IjcuNSIgb3BhY2l0eT0iLjIiIHJ4PSIzIi8+CiAgICA8cGF0aCBkPSJNNSA2LjVINFYyLjFDNCAxLjIzNCA0LjYxMi41IDUuNDE3LjVoOS4xNjZDMTUuMzg4LjUgMTYgMS4yMzQgMTYgMi4xdjQuNGgtMVYyLjFjMC0uMzUtLjIwOS0uNi0uNDE3LS42SDUuNDE3Yy0uMjA4IDAtLjQxNy4yNS0uNDE3LjZ2NC40WiIvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYgNkg0YTMgMyAwIDAgMC0zIDN2NWEzIDMgMCAwIDAgMyAzaDEyYTMgMyAwIDAgMCAzLTNWOWEzIDMgMCAwIDAtMy0zWk0yIDlhMiAyIDAgMCAxIDItMmgxMmEyIDIgMCAwIDEgMiAydjVhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWOVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPgogICAgPHBhdGggZD0iTTE1IDExLjk2OWgxdjUuMjVjMCAuOTctLjU4OCAxLjgxMi0xLjQxNyAxLjgxMkg1LjQxN0M0LjU4OCAxOS4wMzEgNCAxOC4xOSA0IDE3LjIydi01LjI1aDF2NS4yNWMwIC40NzkuMjMzLjgxMi40MTcuODEyaDkuMTY2Yy4xODQgMCAuNDE3LS4zMzMuNDE3LS44MTJ2LTUuMjVaIi8+CiAgICA8cGF0aCBkPSJNMTMuNSAxNS41YS41LjUgMCAwIDEgMCAxaC03YS41LjUgMCAwIDEgMC0xaDdabTAtMmEuNS41IDAgMCAxIDAgMWgtN2EuNS41IDAgMCAxIDAtMWg3WiIvPgogIDwvZz4KPC9zdmc+",
        sizes: "48x48 72x72 96x96 128x128 256x256 512x512 1024x1024",
        type: "image/svg+xml",
        purpose: "any maskable"
      }
    ],
    start_url: "/",
    display: "standalone",
    scope: "/",
    permissions_policy: {
      "cross-origin-isolated": ["self"],
      "web-printing": ["self"]
    }
  });
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
