const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('../controllers/profile_controller');

router.get('/profile/:id', passport.checkAuthentication ,profileController.profile);
router.post('/update/:id', passport.checkAuthentication ,profileController.update);
router.get('/sign-in',profileController.signIn);
router.get('/sign-up',profileController.signUp);

router.post('/create',profileController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect : '/users/profile/sign-in'},
) ,profileController.createSession);

router.get('/sign-out',profileController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/profile/sign-in'}), profileController.createSession );

module.exports = router;   