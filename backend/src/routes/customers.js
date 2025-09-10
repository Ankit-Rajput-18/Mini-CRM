const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');
const { customerSchema } = require("../validators/schemas");
const validate = require("../middleware/validate");

// Create customer
router.post('/', auth, validate(customerSchema), async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;
    const customer = new Customer({ name, email, phone, company, ownerId: req.user.id });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List customers with pagination + search
router.get('/', auth, async (req, res) => {
  try {
    let { page = 1, limit = 10, q = '' } = req.query;
    page = parseInt(page); limit = parseInt(limit);
    const filter = {
      ownerId: req.user.id,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    };

    const total = await Customer.countDocuments(filter);
    const customers = await Customer.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({ data: customers, meta: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single customer with leads
router.get('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    if (customer.ownerId && customer.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const leads = await Lead.find({ customerId: customer._id }).sort({ createdAt: -1 });
    res.json({ customer, leads });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update customer
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete customer + leads
router.delete('/:id', auth, async (req, res) => {
  try {
    await Lead.deleteMany({ customerId: req.params.id });
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer and leads deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
