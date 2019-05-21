const authToken = window.sessionStorage.getItem('AuthToken')
if(!authToken) {
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
            document.querySelector('.portrait').src= '/users/'+ data._id + '/avatar'
        })
    })

    console.log(user)
} catch (e){
    console.log('no portriat')
    document.querySelector('.portrait').src= ''
}