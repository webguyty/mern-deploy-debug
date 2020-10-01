const express = require('express');

const app = express();

// Init Middlware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('shit'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
