const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Simulated database
let tokens = {
  totalSupply: 1000000,
  companyReserve: 1000000,
  price: 1.00
};

let users = {};
let transactions = [];

// Helper function to generate transaction hash
function generateTransactionHash() {
  return crypto.randomBytes(32).toString('hex');
}

// Endpoint 1: Get token information
app.get('/api/token-info', (req, res) => {
  res.json({
    totalSupply: tokens.totalSupply,
    availableSupply: tokens.companyReserve,
    currentPrice: tokens.price
  });
});

// Endpoint 2: Buy tokens
app.post('/api/buy', (req, res) => {
  const { userId, amount } = req.body;
  
  if (amount <= 0 || amount > tokens.companyReserve) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const cost = amount * tokens.price;
  
  // In a real system, you'd handle actual payment here
  
  if (!users[userId]) {
    users[userId] = { balance: 0 };
  }
  
  users[userId].balance += amount;
  tokens.companyReserve -= amount;

  const transaction = {
    hash: generateTransactionHash(),
    type: 'buy',
    userId,
    amount,
    price: tokens.price,
    timestamp: new Date().toISOString()
  };
  transactions.push(transaction);

  res.json({ success: true, transaction });
});

// Endpoint 3: Sell tokens
app.post('/api/sell', (req, res) => {
  const { userId, amount } = req.body;
  
  if (!users[userId] || users[userId].balance < amount) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  const saleValue = amount * tokens.price;
  
  users[userId].balance -= amount;
  tokens.companyReserve += amount;

  const transaction = {
    hash: generateTransactionHash(),
    type: 'sell',
    userId,
    amount,
    price: tokens.price,
    timestamp: new Date().toISOString()
  };
  transactions.push(transaction);

  res.json({ success: true, transaction, saleValue });
});

// Endpoint 4: Get user balance
app.get('/api/balance/:userId', (req, res) => {
  const { userId } = req.params;
  
  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ userId, balance: users[userId].balance });
});

// Endpoint 5: Get transaction history
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});