const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const users = require("./routers/api/users");   
const projects = require('./routers/api/projects');
const issues = require('./routers/api/issues');
const cors = require('cors');
const logger = require('./logger');
const app = express();
const {MONGO_URI} = require('./config')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path');
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));
// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3001;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
    
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    // Setup the logger
app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms', { stream: accessLogStream }))
app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/issues", issues);
app.listen(process.env.PORT || port, ()=> logger.info(`Server is running ${port}`));

module.exports = app;