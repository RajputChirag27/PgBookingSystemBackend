import 'reflect-metadata'
import express from 'express'
import { Connection } from './configs'
import cookieParser from 'cookie-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import {container} from './configs'
import path from 'path'
import cors from 'cors'
import { environment } from './environment'
import { ErrorHandler } from './utils'

const db = new Connection();
const port = environment.port || 3000;


const allowedOrigins = [environment.allowedAddress]
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const server = new InversifyExpressServer(container)

server.setConfig(app => {
  app.use(cors(corsOptions))
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
  app.use(express.json())
  // console.log(`${path.join(__dirname, 'uploads')}/1721026762294-333393531.jpg`);
  app.use(cookieParser())
})

// Register the error handler middleware
server.setErrorConfig((app) => {
    const errorHandler = container.get<ErrorHandler>(ErrorHandler);
    app.use(errorHandler.handleErrors.bind(errorHandler));
  });
  

const app =  server.build()

db.connect()
  .then(() => {
    app.listen(port, (): void => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });