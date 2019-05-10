const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const fetchUrl = '/weather?address=' + search.value

    if (!search.value) {
        messageOne.textContent = 'Please enter a valid address'
        messageTwo.textContent = ''
    } else {

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        fetch(fetchUrl).then((response) => {
            response.json().then((data) => {
                if (data.err) {
                    messageOne.textContent = data.err
                    messageTwo.textContent = ''
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = 'Today is ' + data.summary + ' The high today is: ' + data.tempHigh + '°C, The temperature low: ' + data.tempLow + '°C.'
                }
            })
        })
    }
})