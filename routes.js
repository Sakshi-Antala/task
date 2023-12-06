const Post = require('./src/router/posts.router');
const User = require('./src/router/user.router');

module.exports = function routes(app) {
  app.use('/api/post', Post);
  app.use('/api/user', User);

};
