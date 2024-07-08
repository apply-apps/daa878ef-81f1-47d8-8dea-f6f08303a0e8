// Filename: index.js
// Combined code from all files

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const apiBaseURL = '/api';

// Endpoint definitions
const endpoints = {
    user: {
        fetchAll: `${apiBaseURL}/users`,
        fetchById: (id) => `${apiBaseURL}/users/${id}`,
    },
    product: {
        fetchAll: `${apiBaseURL}/products`,
        fetchById: (id) => `${apiBaseURL}/products/${id}`,
    }
};

// Sample data
const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' }
];

// User endpoints
app.get(endpoints.user.fetchAll, (req, res) => {
    res.json(users);
});

app.get(endpoints.user.fetchById(':id'), (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Product endpoints
app.get(endpoints.product.fetchAll, (req, res) => {
    res.json(products);
});

app.get(endpoints.product.fetchById(':id'), (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${apiBaseURL}`);
});