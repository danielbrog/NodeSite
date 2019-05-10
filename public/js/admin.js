const adminForm = document.querySelector('form')
const user = document.querySelector('#user')
const pass = document.querySelector('#pass')
const message = document.querySelector('#test')

adminForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    message.textContent = user.value+pass.value
    
})