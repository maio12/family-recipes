const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const googleAuth = require('express').Router();
const User = require('../models/user')

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, 
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
      email: profile.emails[0].value,
    }
    
    try {
      let user = await User.findOne({ googleId: profile.id })
      if (user) {
        done(null, user)
      } else {
        user = await User.create(newUser)
        done(null, user)
      }
    }
    catch (err) {
      console.log(err)
    }
  }))

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = User.findById(id, (err, user) => done(err, user))
    } catch (err) {
      done(err);
    }
    })

    googleAuth.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));
    googleAuth.get(
      '/callback',
      passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/home',
        failureRedirect: 'http://localhost:3000/login'
      })
    );
}