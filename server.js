const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Routes to serve the HTML files dynamically
// Set up the static file path for public assets
app.use(express.static(path.join(__dirname, 'public')));

// Set up the route to serve HTML files
app.get('/', (req, res) => {
  res.render('index'); // Rendering index.ejs
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pages', 'home.html')); // Serves home.html
});

app.get('/transaction', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pages', 'transaction.html')); // Serves transaction.html
});

app.get('/budget', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pages', 'budget.html')); // Serves budget.html
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pages', 'profile.html')); // Serves profile.html
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});