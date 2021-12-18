var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use('/:route', express.static('public'));

router.get('/profile/:id', function(req, res, next) {
  res.render('account/views/profile');
});

module.exports = router;
