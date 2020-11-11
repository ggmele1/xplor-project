import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import {MONGO_URI} from './config/keys.js'
import passport from 'passport';

// import dotenv from 'dotenv';
// dotenv.config();

import routes from './routes/routes.js';

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors());


app.use('/', routes)

app.get('/', (req, res) => {
    res.send("Hello from xplor")
})

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  app.use(passport.initialize());

  import Passport from "./config/passport.js";
  (Passport)

mongoose.set('useFindAndModify', false);