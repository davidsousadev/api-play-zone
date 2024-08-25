// index.js
const express = require('express');
// Arquivo de database
const db = require('./database');
const app = express();
const port = 3000;

app.use(express.json());

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// Rota para obter um usuário específico por ID
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ user: row });
  });
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Rota para atualizar um usuário por ID
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ updatedID: id });
  });
});

// Rota para deletar um usuário por ID
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(204).end();
  });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
