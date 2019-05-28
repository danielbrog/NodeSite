if(window.sessionStorage.getItem('AuthToken')){
} else {
    alert('Please log in to use the task app.')
    window.location.replace('/login')
}