const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

// get all customers
router.get("/", async (req, res) => {
  const customer = await Customer.find().sort({ name: 1 });
  res.send(customer);
});

// get specific a customer
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    res.status(404).send("The Customer with the specified ID is not found");

  res.send(customer);
});

// Post a new customer
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(401).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();

  res.send(customer);
});

// update existing customer
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(401).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );

  if (!customer)
    res.status(404).send("The customer with the specified ID is not found!");

  res.send(customer);
});

// delete existing customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    res.status(401).send("The customer with the specified ID is not found");

  res.send(customer);
});

module.exports = router;
