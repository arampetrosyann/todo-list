const express = require("express");
const router = express.Router();
const { renderHome } = require("../controllers/main.controller");

router.get("/", renderHome);

module.exports = router;
