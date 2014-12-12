var userRouter = require('./api/user');
var blogpostRouter = require('./api/blogpost');

module.exports = function router (app) {
  app.use('/api/users', userRouter);
  app.use('/api/blogposts', blogpostRouter);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(function(req, res) {
      res.status(404).json('illegal resource');
    });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile('client/index.html');
    });
}