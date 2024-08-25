// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo do banco de dados
const dbPath = path.join(__dirname, 'database.db');

// Criação ou abertura do arquivo do banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Banco de dados conectado');
  }
});

// Criação da tabela se não existir
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)', (err) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err.message);
    }
  });
});

module.exports = db;
