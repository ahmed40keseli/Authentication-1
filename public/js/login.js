const form = document.getElementById('form');

form.addEventListener('submit', () => {
    // const email = document.getElementById('email');
    // const password = document.getElementById('password'); 
    const login = {
        email:email.value,
        password:password.value
    }
    // const loginData = {
    //     email: email.value,
    //     password: password.value
    // }

    fetch('/api/login', {
        method: 'POST',
        // body: JSON.stringify(loginData),
        body: JSON.stringify(login),
        headers: {
            'content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status == 'error') {
                success.style.display = 'none'
                error.style.display = 'block'
                error.innerText = data.error
            } else {
                error.style.display = 'none'
                success.style.display = 'block'
                success.innerText = data.success
            }
        })
})

