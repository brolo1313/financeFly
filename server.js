const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Налаштовуємо EJS як шаблонний двигун
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Вказуємо папку для статичних файлів (CSS, JS, зображення)
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для головної сторінки
app.get('/', (req, res) => {
  res.render('index'); // Рендеримо index.ejs замість index.html
});

// Маршрут для інших сторінок
app.get('/pages/:page', (req, res) => {
  const { page } = req.params;
  res.render(`pages/${page}`); // Рендеримо динамічні сторінки через EJS
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
