const express = require("express")
const router = express.Router()
const controllers = require("../controller/controller")
const multer = require('multer');

const upload = multer();

router.get("/img", controllers.fistEndpoint)
router.get("/topng", controllers.convetToPng)
router.post("/list", upload.array('files'), controllers.listConvertion)


module.exports = router;