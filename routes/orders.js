const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// In-memory orders list
let orders = [
  { id: 1, name: 'Order One', status: 'pending' },
  { id: 2, name: 'Order Two', status: 'completed' },
  { id: 3, name: 'Order Three', status: 'pending' },
  { id: 4, name: 'Order Four', status: 'cancelled' },
  { id: 5, name: 'Order Five', status: 'pending' }
];

// Apply auth to all routes below
router.use(authMiddleware);

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Add new order
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  const newOrder = { id: Date.now(), name, status: 'pending' };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Delete order
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex(order => order.id === id);
  if (index === -1) return res.status(404).json({ message: 'Order not found' });

  const removed = orders.splice(index, 1);
  res.json({ message: 'Order deleted', order: removed[0] });
});

// Mark as complete
router.put('/:id/complete', (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(order => order.id === id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = 'complete';
  res.json(order);
});

module.exports = router;
