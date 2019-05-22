const authToken = window.sessionStorage.getItem('AuthToken')
const updateForm = document.querySelector('form')

const name = document.querySelector('#nameInput')
const email = document.querySelector('#emailInput')
const password = document.querySelector('#passwordInput')
const age = document.querySelector('#ageInput')
const pic = document.querySelector('#pic')
const errorInfo = document.querySelector('#errorInfo')


if (!authToken) {
    location.replace("/login")
}
try {
    fetch('/users/me', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then((response) => {
        response.json().then((data) => {
            document.querySelector('.portrait').src = '/users/' + data._id + '/avatar'

            document.querySelector('#name').textContent = 'Name: ' + data.name
            document.querySelector('#email').textContent = 'Email: ' + data.email
            document.querySelector('#age').textContent = 'Age: ' + data.age
            document.querySelector('h3').textContent = 'This is ' + data.name + '\'s profile page.'
        })
    })
    
    document.querySelector('#nameInput').style.display = "none"
    document.querySelector('#emailInput').style.display = "none"
    document.querySelector('#ageInput').style.display = "none"
    document.querySelector('#passwordInput').style.display = "none"
    document.querySelector('#updateButton').style.display = "none"
    

} catch (e) {

}

updateForm.addEventListener('submit', (e) => {
    console.log('event triggeered')
    e.preventDefault()


    const formData = new FormData();
    formData.append('avatar', pic.files[0]);
    fetch('/users/me/avatar', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': 'Bearer ' + authToken
        },
        body: formData
    }).then((response) => {
        console.log(response)
        response.json().then((data) => {
            console.log(data)
            if (response.status == 500) {
                errorInfo.textContent = "There was an error updating the image"
            } else {
                console.log('done')
            }
        })
    })



    fetch('/users/me', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
            age: age.value,
        })
    }).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (response.status == 500) {
                errorInfo.textContent = "The Name, email and password are required."
            } else{
                location.replace("/profile")
            }
        })
    })

})

function update() {
    document.querySelector('#pic').style.display = ""
        document.querySelector('#updateButton').style.display = ""
        document.querySelector('#nameInput').style.display = ""
        document.querySelector('#emailInput').style.display = ""
        document.querySelector('#ageInput').style.display = ""
        document.querySelector('#passwordInput').style.display = ""
        document.querySelector('#formButton').style.display = "none"

}

function noImage(){
    document.querySelector('.portrait').src = 'img/noAvatar.png'
}