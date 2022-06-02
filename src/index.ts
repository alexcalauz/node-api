import 'reflect-metadata';
import express from 'express';
import { Config } from './Core/Config';
import Utils from './Core/Utils';

var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.port || Config.port;
const app = express();

app.use(bodyParser.json())

Utils.setupRoutes(app);

app.listen(port, () => console.log(`Api running on port ${port}`));
