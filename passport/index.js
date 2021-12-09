const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const userService = require('../components/auth/userService');

passport.use(new LocalStrategy (
    async function(username, password, done) {
        const user = await userService.findByUsername(username);
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        const isValid = await userService.validPassword(password, user);
        if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, {
        isAuthenticated: user.isAuthenticated,
        isLock: user.isLock,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        _id:user._id,
    });
});

passport.deserializeUser(async function(user, done) {
        done(null, user);
});

module.exports = passport;