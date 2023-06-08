const express = require("express")
const apiRoutes = require("./routes/routes")

const app = express()

app.use('/api', apiRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})