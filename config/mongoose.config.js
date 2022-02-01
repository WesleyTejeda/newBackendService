const mongoose = require('mongoose');
console.log("mongo connect")
mongoose.connect("mongodb+srv://dcbaker92:BakeR__92@cluster0.kvbj3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewURLParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("connected to the database"))
    .catch(err => console.log("failed to connect", err)); 