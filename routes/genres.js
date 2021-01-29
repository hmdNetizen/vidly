const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");
// Get genre
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Get a specific genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  // look up the genre with the specified id

  // if the specified genre does not exist, return an error to the client
  if (!genre)
    return res
      .status(404)
      .send("The genre with the specified ID does not exist");

  // if it exist, go ahead and fetch the genre
  res.send(genre);
});

// Add a new genre
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(401).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// Update genres
router.put("/:id", async (req, res) => {
  // Look up the movie with that specific id and update it
  const { error } = validate(req.body);

  if (error) return res.status(401).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the specified ID is not found");

  res.send(genre);
});

// Delete genre
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre)
    return res
      .status(401)
      .send("The genre with the speicified ID is not found");

  res.send(genre);
});

module.exports = router;
