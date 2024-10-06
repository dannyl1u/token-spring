const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'pages', 'build')));

// Helper function to read the database file
async function readDb() {
  const data = await fs.readFile(DB_FILE, 'utf8');
  return JSON.parse(data);
}

// Helper function to write to the database file
async function writeDb(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/build', 'index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });

// API routes
app.get('/companies', async (req, res) => {
    console.log("test")
  try {
    const db = await readDb();
    res.json(db.companies);
  } catch (error) {
    res.status(500).json({ error: 'Error reading database' });
  }
});

app.get('/companies/:id', async (req, res) => {
  try {
    const db = await readDb();
    const company = db.companies.find(c => c.id === req.params.id);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading database' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.users);
  } catch (error) {
    res.status(500).json({ error: 'Error reading database' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const db = await readDb();
    const user = db.users.find(u => u.id === req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading database' });
  }
});

app.post('buy', async (req, res) => {
  try {
    const { userId, companyId, amount } = req.body;
    const db = await readDb();

    const company = db.companies.find(c => c.id === companyId);
    const user = db.users.find(u => u.id === userId);

    if (!company || !user) {
      return res.status(404).json({ error: 'Company or user not found' });
    }

    if (amount <= 0 || amount > company.availableShares) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    company.availableShares -= amount;

    if (!user.portfolio[companyId]) {
      user.portfolio[companyId] = { shares: 0 };
    }
    user.portfolio[companyId].shares += amount;

    const transaction = {
      id: db.transactions.length + 1,
      type: 'buy',
      userId,
      companyId,
      amount,
      price: company.sharePrice,
      timestamp: new Date().toISOString()
    };
    db.transactions.push(transaction);

    await writeDb(db);

    res.json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ error: 'Error processing purchase' });
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error reading database' });
  }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'build', 'index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});