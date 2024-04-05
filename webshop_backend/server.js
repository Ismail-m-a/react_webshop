const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Route for registering users
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).send('All fields are required.');
  }

  // Read the existing users file
  fs.readFile('./users.json', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).send('An error occurred reading the users file.');
    }
    
    let users = [];
    if (data.length > 0) {
      users = JSON.parse(data.toString());
    }

    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return res.status(400).send('User already exists.');
    }

    // Add new user (hash password in a real application)
    users.push({ name, email, password });

    // Write the updated users to the file
    fs.writeFile('./users.json', JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        return res.status(500).send('An error occurred writing to the users file.');
      }
      res.send('User registered successfully.');
    });
  });
});

// Route for updating products
app.post('/update-products', (req, res) => {
  const products = req.body; // Assuming the body contains the entire product list

  // Write the updated products to the file
  fs.writeFile('./products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).send('An error occurred on the server.');
    }
    res.send('Product data updated successfully.');
  });
});


// Inside your server.js, add this route for login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body; // In a real application, use hashed passwords
  
    fs.readFile('./users.json', (err, data) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      const users = JSON.parse(data.toString());
      const user = users.find(user => user.email === email && user.password === password);
  
      if (!user) {
        return res.status(401).send('Invalid credentials');
      }
  
      res.send({ message: 'Login successful', user: { name: user.name, email: user.email } }); // Avoid sending back the password
    });
});
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
