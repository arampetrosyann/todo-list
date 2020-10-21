const express = require("express");
const path = require("path");
const env = require("./config/env.config");
const connectDb = require("./config/db.config");
const router = require("./routes/main.router");
const api = require("./routes/api.v1");
const notFoundPage = require("./middlewares/notFoundPage.middleware");
const { errorHandler } = require("./middlewares/errorHandling.middleware");

const viewsPath = path.join(__dirname, "views");
const staticFiles = path.join(__dirname, "public");

const app = express();

connectDb();

app.set("view engine", "pug");
app.set("views", viewsPath);
app.use(express.json());
app.use(express.static(staticFiles));

app.use(router);
app.use(api);
app.use(notFoundPage);
app.use(errorHandler);

app.listen(env.PORT);
