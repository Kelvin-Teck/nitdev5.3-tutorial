const express = require('express')
const router =  require("./routes/product.js")

const app = express()

app.use(express.json())

app.use("/api/abc", router)



app.listen(5000, () => {  
    console.log(`Server is running on port 5000`)
})



