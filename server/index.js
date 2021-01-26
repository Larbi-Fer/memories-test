/* import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors' */

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const postRouter = require('./router/posts.js');

const app = express()


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRouter)

const CONNECT_URL = process.env.CONNECT_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, console.log('Server Running on port ', PORT)))
    .catch(err => console.log(err))

mongoose.set('useFindAndModify', false)

// https://www.mongodb.com/cloud/atlas