function submitForm() {
    // Get form input field values
    var name = document.getElementById('fname').value;
    var email = document.getElementById('email').value;

    // Validate full name (at least 6 characters)
    if (name.length < 6) {
        alert("Full name must be at least 6 characters long.");
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format. Please enter a valid email address.");
        return;
    }

    // Create a data object to send in the POST request
    var data = {
        name: name,
        email: email
    };

    // Send a POST request to the server
    fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('User created successfully');
            // Perform any further actions if needed
        } else {
            console.error('Failed to create user');
        }
    })
    .catch(error => console.error('Error:', error));
}
