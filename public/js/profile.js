const authToken = window.sessionStorage.getItem('AuthToken')

document.querySelector('#info').textContent = authToken