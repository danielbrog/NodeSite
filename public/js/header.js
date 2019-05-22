if(window.sessionStorage.getItem('AuthToken')){
    document.querySelector('.login').textContent = 'Logout'
    document.querySelector('.login').href = '/logout'
} else {
    document.querySelector('.login').textContent = 'Login'
    document.querySelector('.profile').href = '/login'
}