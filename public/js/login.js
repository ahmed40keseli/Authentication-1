// form.addEventListener('submit',()=>{
//     const login = {
//         email:email.value,
//         password:password.value
//     }
//     fetch('/api/login', {
//         method:'POST',
//         body:JSON.stringify(loginData),
//         headers : {
//             'content-Type':'application/json'
//         }
//     }).then(res => res.json())
//     .then(data=>{
//         if(data.status == 'error'){
//             success.style.display = 'none'
//             error.style.display = 'block'
//             error.innerText = data.error
//         }else{
//             error.style.display = 'none'
//             success.style.display = 'block'
//             success.innerText = data.success
//         }
//     })
// })


const form = document.getElementById('form'); // Add this line to get the form element

form.addEventListener('submit', () => {
    const email = document.getElementById('email'); // Add this line to get the email input element
    const password = document.getElementById('password'); // Add this line to get the password input element

    const loginData = {
        email: email.value,
        password: password.value
    }

    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
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
