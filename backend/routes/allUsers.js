const express = require('express')
const { protect } = require('../middlewares/authMiddlewares')
const {getAllUsers} = require('../controllers/dashboardController')


const router = express.Router();

router.get('/',protect,getAllUsers);

module.exports = router;