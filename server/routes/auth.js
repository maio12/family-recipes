const express = require('express');
const passport = require('passport');
//const { ensureAuth } = require('../middleware/auth');
const router = express.Router();


//auth with google
//GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

//google auth callback
//GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { successRedirect: 'http://localhost:3000/home', failureRedirect: 'http://localhost:3000/login' })
  //res.redirect('dashboard')
)

//logout user
// /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('http://localhost:3000/login')
})


module.exports = router