document.getElementById('reset-password-form').addEventListener('submit', async(e)=>{
    e.preventDefault();

    const email = document.getElementById('email').value;

    // fetching response
    const response = await fetch('/api/v1/account/reset-password',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
    });

    // result
    const result = await response.json();

    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.classList.remove('text-success', 'text-danger');

    notification.classList.add(response.status===200? 'text-success' : 'text-danger');
    notification.innerText = response.status === 200? 'We have sent you an email to reset password. Please check your inbox.' : result.msg;

     
});