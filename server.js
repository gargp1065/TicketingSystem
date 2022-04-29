const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const users = require("./routers/api/users");   
const projects = require('./routers/api/projects');
const issues = require('./routers/api/issues');
const cors = require('cors');
const logger = require('./logger');
const app = express();
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
const uri = "mongodb+srv://dexter:pgarg22111998@ticket.xipez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/issues", issues);
app.listen(port, ()=> logger.info(`Server is running ${port}`));
