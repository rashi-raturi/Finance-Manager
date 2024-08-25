document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const balance = document.getElementById('balance').value;

    // Fetching response from server (backend)
    const response = await fetch('/api/v1/account/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, balance })
    });


    const result = await response.json();

    // notification block
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.classList.remove('text-success', 'text-danger');
    notification.classList.add(response.status===200? 'text-success' : 'text-danger');
    notification.innerText = response.status === 200? 'Sign Up Successful' : result.msg;
    

    if (response.status === 200) {
        window.location.href = '/';
    }
});
