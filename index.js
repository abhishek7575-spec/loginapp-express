const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Login route
// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Perform login validation using the database
  database.getUserByEmailAndPassword(email, password)
    .then(user => {
      if (user) {
        // Successful login
        res.send(`<script>alert('Login successful'); window.location.href = 'https://www.fico.com';</script>`);
      } else {
        // Invalid credentials
        res.send(`<script>alert('Invalid email or password');</script>`);
      }
    })
    .catch(err => {
      console.error('Error executing login query:', err);
      res.send(`<script>alert('An error occurred during login');</script>`);
    });
});


// Signup route
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const result = database.createUser(username, email, password);

  if (result) {
    res.send(`<script>alert('Signup successful'); window.location.href = '/';</script>`);
  } else {
    res.send(`<script>alert('Error signing up. Please try again.'); window.location.href = '/signup';</script>`);
  }
});

// Root route (login page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

