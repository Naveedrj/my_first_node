const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // use env port for Railway

app.use(express.json()); // parse JSON bodies

// In-memory orders list
let orders = [
  { id: 1, name: 'Order One', status: 'pending' },
  { id: 2, name: 'Order Two', status: 'pending' }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to my Node.js Orders API!');
});

// Get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Add new order
app.post('/orders', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  const newOrder = {
    id: Date.now(), // simple unique id
    name,
    status: 'pending'
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Delete order by id
app.delete('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex(order => order.id === id);

  if (index === -1) return res.status(404).json({ message: 'Order not found' });

  const removed = orders.splice(index, 1);
  res.json({ message: 'Order deleted', order: removed[0] });
});

// Mark order as complete
app.put('/orders/:id/complete', (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(order => order.id === id);

  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = 'complete';
  res.json(order);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
