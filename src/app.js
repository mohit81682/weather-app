const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const forcast = require('./utils/forcast.js');
const geocode = require('./utils/geocode.js');


//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handlebar engine and view location
app.set('views',viewsPath);
app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath);

//set default path for assets
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    // normal render
    //res.render('index')

    res.render('index',{
        'title': 'Weather App',
        'name':'Andrew Mead',
        'type':'index'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        'title': 'About Me',
        'name':'Andrew Mead',
        'type':'about'
    });
});

app.get('/help',(req,res) => {

    res.render('help',{
        'title': 'help',
        'help':'help message',
        'type': 'help'
    });
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        'title': 'Error',
        'error-msg':'Help article not found'
    });
});

app.get('/products',(req,res)=>{
    console.log(req.query);
    res.send(req.query);
});

app.get('/weather',(req,res) => {

    if(!req.query.location){
        return res.send({
            'error': 'Please enter location'
        })
    }
    const address = req.query.location

    //get lat and long
    geocode(address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                'error':error,
            });
        }

        //get weather
        forcast({latitude,longitude,location}, (error, response) => {
            if(error){
                return res.send({
                    'error': error
                })
            }
            return res.send({
                'location': location,
                'latitude': latitude,
                'longitude': longitude,
                'weather' : 'it is currently '+ response.temperature + ' degrees out. There is a '+ response.rain +'% chance of rain'
            })
        })

    });

});

app.get('*',(req,res) =>{
    res.render('404',{
        'title': 'Error',
        'error-msg':'404 page not found'
    });
});

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log('node server is up again on port', port );
});