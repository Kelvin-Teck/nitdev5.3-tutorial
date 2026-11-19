const express = require('express')
const router = require("./routes/product.js")
const {Sequelize} = require('sequelize')

const app = express()

app.use(express.json())

const sequelize = new Sequelize('nitdev-5.3', 'postgres', '1234567890', {
  host: 'localhost',
    dialect: "postgres",
  port: 5433
});


app.use("/api/abc", router)



app.listen(5000, async () => {  
    try {
        await sequelize.authenticate();
        console.log(`Database connection established successfully`)
        
    } catch (err) {
        console.log(`There was an error connecting to the database -------- ${err.message}`)
    }
    console.log(`Server is running on port 5000`)
})

// Cehaguy was here

