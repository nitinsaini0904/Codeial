const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile_controller');

router.get('/profile',profileController.profile);
router.get('/sign-in',profileController.signIn);
router.get('/sign-up',profileController.signUp);

module.exports = router;   