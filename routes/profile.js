const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile_controller');

router.get('/',profileController.profile);
router.get('/sign-in',profileController.signIn);
router.get('/sign-up',profileController.signUp);

router.post('/create',profileController.create);
module.exports = router;   