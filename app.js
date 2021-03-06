const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
var ua = require('universal-analytics');



const indexRouter = require('./components/home');
const accountRouter = require('./components/account');

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const productsRouter = require('./components/products');
const productDetailsRouter = require('./routes/product-detail');
const contactRouter = require('./routes/contact');
const authRouter = require('./components/auth');
const loggedInUserGuard = require('./middlewares/loggedInUserGuard');
const searchRouter=require("./components/products/searchRouter")
const cartRouter=require('./components/cart/index')
const ApiRouter=require('./api/index')
const orderRouter = require('./components/order/index');
const passport = require("./passport");

const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'components')]);
app.set('view engine', 'hbs');

app.use("/products", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

console.log(process.env.SESSION_SECRET);
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
const visitor = ua('UA-215100174-4');

app.use(function (req, res, next) {
  res.locals.user = req.user;
  /* GET home page. */
  visitor.pageview(req.originalUrl).send()
  next();
})



app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/account', loggedInUserGuard, accountRouter);
app.use('/search',searchRouter);
app.use('/products', productsRouter);
app.use('/product-detail', productDetailsRouter);
app.use('/contact', contactRouter);
app.use('/cart',loggedInUserGuard,cartRouter);
app.use('/api',ApiRouter);
app.use('/order',loggedInUserGuard,orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;