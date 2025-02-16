require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection Error:', err));

// Routes
app.use('/api/register/assessor', require('./routes/assessorRoutes'));
app.use('/api/register/consultant', require('./routes/consultantRoutes'));
app.use('/api/register/ib', require('./routes/ibRoutes'));
app.use('/api', require('./routes/apiRoutes'));

app.get("/", (req, res) => {
  res.send("API is running...");
});


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));