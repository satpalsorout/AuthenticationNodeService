const express=require('express')
const jwt = require('jsonwebtoken')
const router=express.Router()
const User=require('../models/user')
const mongoose=require('mongoose')
const db="mongodb://dbasatpal:1satpal@ds121212.mlab.com:21212/eventsdb"

mongoose.connect(db,{ useNewUrlParser: true },function(err,db){
    if(err){
        console.log(err);
    }
    else {
        console.log('connected to mongoose');
    }
  })

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token == 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,'secretkey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    } 
    req.userId = payload.subject
    next()

}

router.get('/', (req, res)=>
{
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData=req.body
    let user=new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
           console.log(error)
        } else {
            let payload= { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).send({token})
        }
   })
})

router.post('/login', (req, res) => {
    let userData=req.body
    User.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send('Invalid email')
            } else
            if ( user.password !==userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload= { subject: user.id }
                let token = jwt.sign(payload, 'secretkey')
               res.status(200).send({token})
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events =[
        {
            "id":"1",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"2",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"3",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"4",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"5",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"6",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
    let events =[
        {
            "id":"1",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"2",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"3",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"4",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"5",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "id":"6",
            "name": "Auto Expo",
            "descrption": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

module.exports=router