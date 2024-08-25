const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const port = 3000;

const apiUrl = process.env.URL;
const apiToken = process.env.RESTDB_TOKEN;

app.use(express.json());

app.use(cors({
  origin: {apiUrl}, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-apikey': apiToken,
    'cache-control': 'no-cache'
  }
});

app.get('/users', async (req, res) => {
  try {
    const response = await axiosInstance.get('/');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axiosInstance.get(`/${id}`);
    if (response.data) {
      res.json(response.data);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const response = await axiosInstance.post('/', { name, email });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const response = await axiosInstance.put(`/${id}`, { name, email });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await axiosInstance.delete(`/${id}`);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}/users`);
});
