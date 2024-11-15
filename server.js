const express = require("express");
const dotenv = require("dotenv").config();
const contact_routes = require("./routes/ContactRoutes");
const user_routes = require("./routes/UserRoutes");
const errorHandler = require("./middlewares/ErrorHandler");
const dbConnect = require("./configs/DBConnection");
let cors = require("cors");
dbConnect();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use( "/api/contacts", contact_routes);
app.use( "/api/user",  user_routes);

app.listen(port, () =>{
    console.log("listening on port: ", port)
})



