const express = require('express');
const app = express();

app.get("/", function(request, response) {
  response.send("<h1>Hello, World!</h1>");
});

app.get("/users/:name", function(req, res) {
  res.send(`<h1>Hello, ${req.params["name"]}</h1>`);
});

app.listen(3000, function(error) {
  if (error) {
    console.log("An error occurred: " + error);
  } else {
    console.log("Listening on localhost:3000");
  }
});