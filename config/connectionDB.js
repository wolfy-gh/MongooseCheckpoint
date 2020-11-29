const mongoose = require("mongoose")

// We'll mongodb_altas for database connection : 
// User : thyironwolf25
// password : wael123
// dbname : mongoose
//Network access : 0.0.0.0/0  (includes your current IP address)

// connection to database

const connect_DB = async()=> {
    try {
        await mongoose.connect(process.env.DB_URI,{useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify:false})
        console.log("database is connected")
    } catch (error) {
        console.error(`database is not connected : ${error}`)
    }
}
module.exports = connect_DB


