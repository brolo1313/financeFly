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

app.get('/views/pages/:page', (req, res) => {
  const { page } = req.params;
  res.sendFile(path.join(__dirname, 'views/pages', `${page}.html`));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});