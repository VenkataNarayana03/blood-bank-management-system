const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Donation = require('../models/Donation');

// Add or Update Inventory by Hospital + Location + Blood Group
router.post('/inventory', async (req, res) => {
  const { hospital, location, bloodGroup, units } = req.body;

  console.log("📥 POST /inventory payload:", req.body);

  if (!hospital || !location || !bloodGroup || !units) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let record = await Inventory.findOne({ hospital, location, bloodGroup });

    if (record) {
      record.units += Number(units);  // Convert units to number
    } else {
      record = new Inventory({ hospital, location, bloodGroup, units });
    }

    await record.save();
    res.status(201).json({ message: 'Inventory updated successfully', record });
  } catch (error) {
    console.error("❌ Error while updating inventory:", error.message);
    res.status(500).json({ message: 'Server error while saving inventory' });
  }
});

// Reduce Inventory Units
router.put('/inventory/reduce', async (req, res) => {
  const { hospital, location, bloodGroup, units } = req.body;

  try {
    const record = await Inventory.findOne({ hospital, location, bloodGroup });

    if (!record || record.units < units) {
      return res.status(400).json({ message: 'Not enough units available' });
    }

    record.units -= units;
    await record.save();
    res.json({ message: 'Inventory reduced', record });
  } catch (error) {
    console.error("❌ Error while reducing inventory:", error.message);
    res.status(500).json({ message: 'Server error while reducing inventory' });
  }
});

// Get All Inventory
router.get('/inventory', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    console.error("❌ Error fetching inventory:", error.message);
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
});

// Add Donation (also updates inventory)
router.post('/donate', async (req, res) => {
  const { hospital, location, bloodGroup, units, donorEmail } = req.body;

  console.log("📥 POST /donate payload:", req.body);

  if (!hospital || !location || !bloodGroup || !units || !donorEmail) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let record = await Inventory.findOne({ hospital, location, bloodGroup });

    if (record) {
      record.units += Number(units);
    } else {
      record = new Inventory({ hospital, location, bloodGroup, units });
    }

    await record.save();
    await Donation.create({
      donorEmail,
      date: new Date(),
      hospital,
      location,
      bloodGroup,
      units: Number(units)
    });

    res.status(201).json({ message: 'Donation added & inventory updated', record });
  } catch (error) {
    console.error("❌ Error during donation:", error.message);
    res.status(500).json({ message: 'Server error while donating' });
  }
});

// DELETE Inventory by ID
router.delete('/inventory/:id', async (req, res) => {
  try {
    const deleted = await Inventory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Inventory record not found' });
    }

    res.status(200).json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    console.error("❌ Error deleting inventory:", error.message);
    res.status(500).json({ message: 'Server error while deleting inventory' });
  }
});

module.exports = router;
