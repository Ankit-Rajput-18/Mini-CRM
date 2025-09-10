require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');    
const customerRoutes = require('./routes/customers');
const leadRoutes = require('./routes/leads');

const app = express();                           

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);               
app.use('/api/customers', customerRoutes);
app.use('/api/leads', leadRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Mini CRM API running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mini-crm')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
