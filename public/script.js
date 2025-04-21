document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const messageEl = document.getElementById('message');
  const errorEl = document.getElementById('error');
  messageEl.textContent = '';
  errorEl.textContent = '';

  const formData = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    dateOfBirth: document.getElementById('dateOfBirth').value,
  };

  if (!formData.username || !formData.email || !formData.dateOfBirth) {
    errorEl.textContent = 'All fields are required';
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errorEl.textContent = 'Invalid email format';
    return;
  }

  const dob = new Date(formData.dateOfBirth);
  if (isNaN(dob.getTime()) || dob > new Date()) {
    errorEl.textContent = 'Invalid or future date of birth';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      messageEl.textContent = result.message;
      document.getElementById('userForm').reset();
    } else {
      errorEl.textContent = result.message || 'An error occurred';
    }
  } catch (error) {
    errorEl.textContent = 'Failed to connect to the server';
    console.error('Form submission error:', error);
  }
});
