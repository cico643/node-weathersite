console.log("Javascript file")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''
    const location = search.value
    console.log(location)

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then(({error,location, forecastData}) => {
            if(error) {
                messageOne.innerHTML = error
            }
            else{  
                messageOne.innerHTML = location
                messageTwo.innerText = "Şu anda "+ forecastData[0].description
                console.log(forecastData[0])
            }
            
        })
    })

})