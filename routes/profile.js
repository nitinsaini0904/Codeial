const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('../controllers/profile_controller');

router.get('/', passport.checkAuthentication ,profileController.profile);
router.get('/sign-in',profileController.signIn);
router.get('/sign-up',profileController.signUp);

router.post('/create',profileController.create);

router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect : '/profile/sign-in'},
) ,profileController.createSession);

router.get('/sign-out',profileController.destroySession);
module.exports = router;   