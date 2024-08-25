document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Fetching response from server (backend)
    const response = await fetch('/api/v1/account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });


    const result = await response.json();

    // notification block
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.classList.remove('text-success', 'text-danger');
    notification.classList.add(response.status===200? 'text-success' : 'text-danger');
    notification.innerText = response.status === 200? 'Login Successful' : result.msg;
    

    if (response.status === 200) {
        window.location.href = '/';
    }
});
