const productControllers = require("../controllers/books")
const fileUploader = require("../lib/uploader")

const router = require("express").Router()

router.get("/", productControllers.getAllProduct)
router.post("/",
fileUploader({
    destinationFolder: "product-cover",
    fileType: "image",
    prefix: "POST"
}).single("post_image_file"),
productControllers.createNewProduct)
router.patch("/:id", productControllers.editProduct)
router.delete("/:id", productControllers.deleteProduct)

module.exports = router