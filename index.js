const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Connected on localhost:http://localhost:${PORT} !`);
  });
});
