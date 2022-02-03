const mongoose = require('mongoose');
require("dotenv").config();
console.log("mongo connect")
mongoose.connect(process.env.DB_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("connected to the database"))
    .catch(err => console.log("failed to connect", err)); 