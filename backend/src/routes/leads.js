const express = require('express');
const router = express.Router({ mergeParams: true });
const Lead = require('../models/Lead');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

// Create lead for a customer
router.post('/:customerId/leads', auth, async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    // owner check (optional)
    if (customer.ownerId && customer.ownerId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, description, status, value } = req.body;
    const lead = new Lead({ customerId, title, description, status, value });
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List leads for customer
router.get('/:customerId/leads', auth, async (req, res) => {
  try {
    const { customerId } = req.params;
    const leads = await Lead.find({ customerId }).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update lead
router.put('/:customerId/leads/:id', auth, async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete lead
router.delete('/:customerId/leads/:id', auth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
