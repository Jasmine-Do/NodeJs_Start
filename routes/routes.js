const express = require('express');

const router = express.Router();
const productController = require('../controller/productController');
const dataController = require('../controller/dataController');


router.get("/", productController.index);
router.get("/login", productController.get_login);
router.post("/login", productController.login);
router.get("/logout", productController.logout); 
router.get("/register",productController.get_register);
router.post("/register",productController.register);
router.get("/add_product",productController.get_add_product);
router.post("/add_product",productController.add_product);

router.get("/data",dataController.get_data);
router.delete("/data/:id",dataController.delete_data);
router.get("/data/:id",dataController.get_x_data);
router.put("/data",dataController.update_data);
router.post("/search",dataController.search);

module.exports = router;