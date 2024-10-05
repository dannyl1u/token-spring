const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

// Add your routes here
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/pages/index.html', {});
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});