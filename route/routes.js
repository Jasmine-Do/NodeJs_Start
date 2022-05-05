const express = require('express');

const router = express.Router();
const dataController = require('../controller/dataController');

router.get("/",dataController.get_data);
router.delete("/:id",dataController.delete_data);
router.get("/:id",dataController.get_x_data);
router.put("/",dataController.update_data);
router.post("/search",dataController.search);

module.exports = router;