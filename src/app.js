const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode =require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath= path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Application',
        name:'Rahul R Gaykar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Test Test',
        content:'Test'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Help page',
        content:'This Help Content (Topics) template is one in a series of templates to help readers plan and manage communications and content management activities, resources and deliverables. We welcome ideas and suggestions for other Template Tuesday materials.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Address not provided'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error:error })
        }

        forecast(latitude,longitude,(error,{location})=>{
            if(error){ return res.send({error:error})}
        })
            res.send({
                location:location,
                name:'Weather name',
                forecast: 'It is snowing',
                location: 'Philadelphia'
            })
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Search product not found'
        })
    }
    res.send({
        Product:req.query.search
    })
})

app.get('/help/*',(req,res)=>{
    res.render('generic',{
    title:'Unable to find the content'
})
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title:'Page not found'
    })
})

app.listen(2000, () => {
    console.log('Server is up on port 2000.')
})