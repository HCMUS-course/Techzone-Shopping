const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const authService = require('../components/auth/authService');

passport.use(new LocalStrategy (
    async function(username, password, done) {
        const user = await authService.findByUsername(username);
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        const isValid = await authService.validPassword(password, user);
        if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        const isLock = await authService.isLock(user);
        if (isLock) {
            return done(null, false, { message: 'Account locked!.' });
        }

        const isAuthenticated = await authService.getAuthenticationState(user);
        if (!isAuthenticated) {
            return done(null, false, { message: 'Unauthenticated email.' });
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, {
        isAuthenticated: user.isAuthenticated,
        activationString: user.activationString,
        isLock: user.isLock,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        _id: user._id,
    });
});

passport.deserializeUser(async function(user, done) {
        done(null, user);
});

module.exports = passport;