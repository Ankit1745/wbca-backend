const express = require("express");

const router = express.Router();

router.get("/test", async (req, res) => {
  res.status(200).json({ success: true, error: "Server testing" });
});

module.exports = router;
