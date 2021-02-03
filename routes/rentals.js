const router = require("express").Router();
const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort(-dateOut);
  res.json(rental);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  let rental = {
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailRentalRate,
    },
  };

  rental = await rental.save();

  res.json(rental);
});
router.put("/:id", (req, res) => res.send("Hello world"));
router.delete("/:id", (req, res) => res.send("Hello world"));

module.exports = router;
