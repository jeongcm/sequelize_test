import { NextFunction } from "express";
import { sequelize } from "../src/app/models";	//방금 만든 sequelize객체를 import해준다.(index.ts에 만들었으므로 폴더명만 입력하면 먼저 자동으로 index.ts를 찾아 그 안에 있는거 import)

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")

dotenv.config();

var corsOptions = {
  origin: "http://localhost:8081"
};

const PORT:number = parseInt(process.env.PORT as string, 10) || 3306;
const HOST:string = process.env.HOST || 'localhost';

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models")


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req:Request,res:Response,next:NextFunction) => {
  console.log(`Request Occur! ${req.method}, ${req.url}`);
  next();
})

sequelize.getQueryInterface().createDatabase("sequelize_test")
.then(() => {
  console.log("create success")
})
.catch((e) => {
  console.log("error create database")
})

// app.listen(PORT,HOST,async () => {
//   console.log(`Server Listening on ${HOST}:${PORT}`);

//   // //sequelize-db 연결 테스트
//    await sequelize.authenticate()
//    .then(async () => {
//        console.log("connection success");
//    })
//    .catch((e) => {
//        console.log('TT : ', e);
//    })
// })
