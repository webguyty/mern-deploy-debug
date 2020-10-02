const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database g
connectDB();

// Init Middlware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('shit'));

// Define routes
// app.use('/aroute', require('./routes/test1'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
