function order() {
    // Get form input field values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Validate name
    if (name.length === 0) {
        alert("Name is required.");
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
        email: email,
        message: message
    };

    // Send a POST request to the server
    fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Message sent successfully');
            // Perform any further actions if needed
        } else {
            console.error('Failed to send message');
        }
    })
    .catch(error => console.error('Error:', error));
}

    