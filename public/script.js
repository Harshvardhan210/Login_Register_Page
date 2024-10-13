// Handle Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        const message = document.getElementById('message');
        if (data.success) {
            message.style.color = 'green';
        } else {
            message.style.color = 'red';
        }
        message.textContent = data.message;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Handle Registration Form Submission
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        const message = document.getElementById('message');
        if (data.success) {
            message.style.color = 'green';
        } else {
            message.style.color = 'red';
        }
        message.textContent = data.message;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
