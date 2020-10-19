const userController = require('../controllers/controller_user');

module.exports = (app) => {
  app.get('/user', (req, res) => res.status(200).send({
    message: 'Welcome to the user routes!',
  }));

  app.post('/api/user', userController.create);
  app.get('/api/user', userController.list);
  app.get('/api/user/:userId', userController.retrieve);
  app.put('/api/user/:userId', userController.update);
  app.delete('/api/user/:userId', userController.destroy);

};