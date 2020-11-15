const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/routes.js");

routes(app);

app.listen(process.env.PORT, function(request, response) {
    console.log("Server running on port: "+process.env.PORT);
})