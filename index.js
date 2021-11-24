const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(cookieParser("senha"))

app.use(session({
    secret: 'keyboard cat',   
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000}

}))

app.use(flash())

app.get('/', (req, res) => {
    var emailError = req.flash("emailError")
    var nomeError = req.flash("nomeError")
    var senhaError = req.flash("senhaError")
    var email = req.flash("email", email)

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
    email = (email == undefined || email.length == 0) ? "" : email

    res.render('index', {emailError, nomeError, senhaError, email})



  
})

app.post('/form', (req, res) => {
    var {email, nome, senha} = req.body   
    var emailError;
    var nomeError;
    var senhaError;

    
    if(nome == undefined || nome == '') {
        nomeError = 'O nome não pode ser vazio'        
    }
    if(email == undefined || email == '') {
        emailError = 'O email não pode ser vazio'
    }  
    if(senha == undefined || senha == '') {
        senhaError = 'A senha não pode ser vazia'
    }  
    if(emailError != undefined || nomeError != undefined || senhaError != undefined){
        req.flash("nomeError", nomeError)
        req.flash("emailError", emailError)
        req.flash("senhaError", senhaError)
        req.flash("email", email)
        res.redirect('/')

    }     



})


app.listen(8000,(req, res) => {
    console.log("Api no ar")
})