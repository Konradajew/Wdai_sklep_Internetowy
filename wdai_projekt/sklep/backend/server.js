const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'klucz';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Inicjalizacja bazy danych SQLite
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err.message);
  } else {
    console.log('Połączono z bazą danych SQLite.');
  }
});

// Tworzenie tabeli użytkowników, jeśli jeszcze nie istnieje
db.run(`
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )
`, (err) => {
  if (err) {
    console.error('Błąd tworzenia tabeli koszyka:', err.message);
  }
});

// Endpoint rejestracji
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email i hasło są wymagane.' });
  }

  try {
    // Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    // Wstawienie użytkownika do bazy danych
    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.run(query, [email, hashedPassword], (err) => {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ message: 'Email już istnieje.' });
        }
        return res.status(500).json({ message: 'Błąd zapisu w bazie danych.' });
      }
      res.status(201).json({ message: 'Rejestracja zakończona sukcesem.' });
    });
  } catch (err) {
    console.error('Błąd serwera:', err.message);
    res.status(500).json({ message: 'Błąd serwera.' });
  }
});

// Endpoint logowania
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email i hasło są wymagane.' });
    }
  
    // Sprawdzenie, czy użytkownik istnieje w bazie
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Błąd bazy danych.', error: err.message });
      }
  
      if (!user) {
        return res.status(401).json({ message: 'Nieprawidłowy email lub hasło.' });
      }
  
      // Porównanie hasła
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Nieprawidłowy email lub hasło.' });
      }
  
      // Tworzenie tokenu JWT
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ message: 'Logowanie zakończone sukcesem.', token });
    });
});

//dodanie do koszyka
app.post('/cart', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Brak tokenu uwierzytelniającego.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ message: 'Product ID i ilość są wymagane.' });
    }

    // Sprawdzenie, czy produkt już jest w koszyku
    const queryCheck = `SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?`;
    db.get(queryCheck, [decoded.id, product_id], (err, item) => {
      if (err) {
        return res.status(500).json({ message: 'Błąd bazy danych.', error: err.message });
      }

      if (item) {
        // Jeśli produkt jest w koszyku, zwiększ ilość
        const queryUpdate = `UPDATE cart SET quantity = quantity + ? WHERE id = ?`;
        db.run(queryUpdate, [quantity, item.id], (err) => {
          if (err) {
            return res.status(500).json({ message: 'Błąd aktualizacji koszyka.', error: err.message });
          }
          res.status(200).json({ message: 'Produkt zaktualizowany w koszyku.' });
        });
      } else {
        // Jeśli produkt nie jest w koszyku, dodaj nowy wpis
        const queryInsert = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`;
        db.run(queryInsert, [decoded.id, product_id, quantity], (err) => {
          if (err) {
            return res.status(500).json({ message: 'Błąd dodawania do koszyka.', error: err.message });
          }
          res.status(201).json({ message: 'Produkt dodany do koszyka.' });
        });
      }
    });
  } catch (err) {
    return res.status(401).json({ message: 'Nieprawidłowy token.' });
  }
});

//pobranie koszyka
app.get('/cart', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Brak tokenu uwierzytelniającego.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const query = `
      SELECT c.product_id, c.quantity, p.title, p.price
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `;
    db.all(query, [decoded.id], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Błąd bazy danych.', error: err.message });
      }
      res.status(200).json(rows);
    });
  } catch (err) {
    return res.status(401).json({ message: 'Nieprawidłowy token.' });
  }
});

//usuniecie z koszyka
app.delete('/cart', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Brak tokenu uwierzytelniającego.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: 'Product ID jest wymagany.' });
    }

    const query = `DELETE FROM cart WHERE user_id = ? AND product_id = ?`;
    db.run(query, [decoded.id, product_id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Błąd usuwania z koszyka.', error: err.message });
      }
      res.status(200).json({ message: 'Produkt usunięty z koszyka.' });
    });
  } catch (err) {
    return res.status(401).json({ message: 'Nieprawidłowy token.' });
  }
});


// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
