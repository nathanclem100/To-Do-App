document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const password2Input = document.querySelector('input[name="password2"]');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset any previous error messages
        clearErrors();
        
        let isValid = true;
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(nameInput.value.trim())) {
            showError(nameInput, 'Name should contain only letters');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!passwordInput.value) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters long');
            isValid = false;
        }
        
        // Validate password confirmation
        if (!password2Input.value) {
            showError(password2Input, 'Please confirm your password');
            isValid = false;
        } else if (passwordInput.value !== password2Input.value) {
            showError(password2Input, 'Passwords do not match');
            isValid = false;
        }
        
        if (isValid) {
            try {
                const response = await fetch('http://localhost:5000/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameInput.value.trim(),
                        email: emailInput.value.trim(),
                        password: passwordInput.value
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Error during signup');
                }

                // Store user data
                const userData = {
                    userId: data.userId,
                    name: data.name,
                    isLoggedIn: true
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Redirect to main page
                window.location.href = 'mwd.html';
            } catch (error) {
                showError(emailInput, error.message);
            }
        }
    });

    function showError(input, message) {
        const parentDiv = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        parentDiv.appendChild(errorDiv);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
    }
});
