
//Requiring all the necessary modules 
require("dotenv").config();
const express = require("express");
const app = express();

//Making a GET request to the root route 
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Requiring the OAuth Authorization module  
const authorize = require("./src/authorization/auth");

//Requiring the AutoReply module 
const autoRespondEmail = require("./src/main/auto_reply");

//Executing the AutoReply module given that the user is authenticated and authorized
authorize().then(autoRespondEmail).catch(console.error);

//Listenning and starting the server on port specified in the .env file 
app.listen(process.env.PORT, () => {
  console.log("Server started on port: " + process.env.PORT);
});
