require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to my Node.js Orders API with Auth!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
