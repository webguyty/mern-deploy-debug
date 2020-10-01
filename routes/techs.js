const express = require('express');
const router = express.Router();

const Techs = require('../models/Techs');

// @route		GET api/techs
// @desc		Get all techs
// @access 	Public
router.get('/', async (req, res) => {
  try {
    const techs = await Techs.find();
    res.json(techs);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('Server Error');
  }
});

// @route		POST api/techs
// @desc		Create a tech
// @access	Public
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const newTech = new Techs({
      firstName,
      lastName,
    });

    const tech = await newTech.save();

    res.json(tech);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route		DELETE api/techs
// @desc		Delete a tech
// @access	Public

router.delete('/:id', async (req, res) => {
  try {
    let tech = await Techs.findById(req.params.id);
    if (!tech) return res.status(404).json({ msg: 'Log not found' });

    await Techs.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Tech Deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
