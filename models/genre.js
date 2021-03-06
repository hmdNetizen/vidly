const mongoose = require("mongoose");
const Joi = require("joi");

// Create a mongoose schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

// Create a model for schema
const Genre = mongoose.model("Genre", genreSchema);

function validateGenres(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenres;
exports.genreSchema = genreSchema;
