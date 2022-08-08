const express = require('express');
const path = require('path');
const hbs = require('hbs');

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '..'));

const app = express();
const publicPathDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.use(express.static(publicPathDir));

app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// app.get('', (req, res) => {
//     res.send('Hello Express!');
// });

// app.get('/help', (req, res) => {
//     res.send('Help Content');
// });

// app.get('/about', (req, res) => {
//     res.send('<h2>About Web Server and Express</h2>');
// });

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'vaishali'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'vaishali'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        help_msg:'Help Message will goes here!',
        title:'Help'
    })
});


const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            message:"You must provide an address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, message) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                message:message.msg,
                location:location
            });
        })
    })
    
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            message:'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('help_404', {
        title:'404',
        errorMsg:'Help Content Not Found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMsg:'Page Not Found'
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})