const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
})
db.once("open", () => {
     console.log("Connected to DataBase")
})