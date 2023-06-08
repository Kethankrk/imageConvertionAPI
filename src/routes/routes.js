const express = require("express")
const router = express.Router()
const controllers = require("../controller/controller")

router.get("/img", controllers.fistEndpoint)


module.exports = router;