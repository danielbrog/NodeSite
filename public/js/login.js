const loginForm = document.querySelector('form')
const email = document.querySelector('#email')
const password = document.querySelector('#pass')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const loginButton = document.querySelector('#test')
let submitType = 'login'

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (submitType == 'login') {
        if (!email.value || !password.value) {
            messageOne.textContent = 'Please enter a valid email address and password'
        } else {
            messageOne.textContent = 'logging in...'
            messageTwo.textContent = ''

            fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data)
                    if (response.status == 400) {
                        messageOne.textContent = "There was an error logging in."
                    } else {
                        window.sessionStorage.setItem('AuthToken', data.token)
                        location.replace("/profile")
                    }
                })
            })
        }
    } else if (submitType == 'newAcc') {

        window.location.href = ("/createAccount")
    }

})

function setLogin(arg) {
    submitType = arg;
}

loginForm.addEventListener('test', (e) => {
    e.preventDefault()

    messageOne.textContent = "TEST"
})