const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const path = require('path');

require('./server/models').connect(config.MONGODB_URI);

const app = express();

app.use(express.static('./server/public/'));
app.use(express.static('./client/dist/'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(passport.initialize());

const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

const authRoutes = require('./server/routes/auth.js');
app.use('/auth', authRoutes);
const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/server/public/index.html');
});

app.listen(3000, () => {
  console.log('Server is running on localhost port 3000');
});
