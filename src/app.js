const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handelbars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Cihat Yeşildağ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Cihat Yeşildağ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Do you need any help?',
        name: 'Cihat Yeşildağ'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an adress'
        })
    }  

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        
        forecast(latitude, longitude,(error,forecastData) => {
            if(error) {
                return res.send({error})
            }
    
            
            res.send({
                location,
                forecastData
            })
            
        })
    })


    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cihat Yeşildağ',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cihat Yeşildağ',
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log("Server is up on port "+port+".")
})