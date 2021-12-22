const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const postsController = require('../controllers/posts_controller');

router.get('/profile',postsController.post);
router.get('/',homeController.home);

module.exports = router;