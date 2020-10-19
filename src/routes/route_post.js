const postController = require('../controllers/controller_post.js');
const auth = require('./auth.js');



module.exports = (app) => {
  app.get('/post',auth, (req, res) => res.status(200).send({
    message: 'Welcome to the post routes!',
  }));

  app.post('/api/post',auth, postController.create);
  app.get('/api/post',auth, postController.list);
  app.get('/api/post/:postId',auth, postController.retrieve);
  app.put('/api/post/:postId',auth, postController.update);
  app.delete('/api/post/:postId',auth, postController.destroy);

};