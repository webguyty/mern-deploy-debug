const express = require('express');
const router = express.Router();

const Logs = require('../models/Logs');

// router.get('/', (req, res) => {
//   res.send('logs api');
// });

// // @route		GET api/logs
// // @desc		Get all logs
// // @access 	Public
router.get('/', async (req, res) => {
  try {
    const logs = await Logs.find();
    res.json(logs);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('Server Error');
  }
});

// @route		POST api/logs
// @desc		Create a log item
// @access	Public
router.post('/', async (req, res) => {
  try {
    const { message, attention, tech } = req.body;

    const newLog = new Logs({
      message,
      attention,
      tech,
    });

    const log = await newLog.save();
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route		DELETE api/logs
// @desc		Delete a log item
// @access	Public

router.delete('/:id', async (req, res) => {
  try {
    let log = await Logs.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: 'Log not found' });

    await Logs.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Log Deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route		PUT api/logs
// @desc		Delete a log item
// @access	Public

router.put('/:id', async (req, res) => {
  const { message, attention, tech, date } = req.body;

  const logFields = {};

  if (message) logFields.message = message;
  if (attention !== null) logFields.attention = attention;
  if (tech) logFields.tech = tech;
  if (date) logFields.date = date;

  try {
    let log = await Logs.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: 'Log not found' });

    log = await Logs.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route		GET api/logs/search
// @desc		Search and get selected logs
// @access 	Public
router.get('/search/:str', async (req, res) => {
  try {
    // res.send(req.params.str);
    const logs = await Logs.find({
      $or: [
        { message: { $regex: req.params.str, $options: 'i' } },
        { tech: { $regex: req.params.str, $options: 'i' } },
      ],
    });
    res.json(logs);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
