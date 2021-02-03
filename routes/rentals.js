const router = require("express").Router;
const { Rental } = require("../models/rental");

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("-name");

  res.send(rental);
});

module.exports = router;
