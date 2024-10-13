const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON data and serve static files from 'public' folder
app.use(bodyParser.json());
app.use(express.static('public'));

// Function to load users from users.json or return an empty object
function loadUsers() {
    try {
        const data = fs.readFileSync('users.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        // If file is empty or invalid, return an empty object
        console.log('Error loading users.json, initializing with empty object.');
        return {};
    }
}

// Function to save users to users.json
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Load users when the server starts
let users = loadUsers();

// Serve login.html when accessing the root URL '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the username exists and the password is correct
    if (users[username] && users[username] === password) {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
});

// Handle registration POST request
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    if (users[username]) {
        res.json({ success: false, message: 'Username already taken' });
    } else {
        // Save the new user
        users[username] = password;
        saveUsers(users);  // Save the users to users.json
        res.json({ success: true, message: 'Registration successful!' });
    }
});

// Start server on port 3000
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
