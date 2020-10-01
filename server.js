const express = require('express');

const app = express();

// Init Middlware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('shit'));

// Define routes
app.use('/aroute', require('./routes/test1'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
