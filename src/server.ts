import { NextFunction } from "express";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const DB = require("./app")
import {InitialRecordService} from './app/initRecord'

dotenv.config();

var corsOptions = {
  origin: "http://localhost:8081"
};

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req:Request,res:Response,next:NextFunction) => {
  console.log(`Request Occur! ${req.method}, ${req.url}`);
  next();
})

DB.sequelize.sync({ force: false })
    .then(async () => {
        const initRecordService = new InitialRecordService();
        initRecordService.insertInitialRecords().then(() => {
            console.log('Sync done')
        });

    })
    .catch((e) => {
      console.log(e);
});
