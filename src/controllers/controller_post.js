const users = require('../models/users.js');
const posts = require('../models/posts.js');

module.exports = {
  create(req, res) {
    return posts
      .create({
        content: req.body.content,
        description: req.body.description,
      })
      .then((posts) => res.status(201).send(posts))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return posts
      .findAll({
        /*include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC'],
        ],*/
      })
      .then((posts) => res.status(200).send(posts))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return posts
      .findById(req.params.postId, {
        /*include: [{
          model: TodoItem,
          as: 'todoItems',
        }],*/
      })
      .then((posts) => {
        if (!posts) {
          return res.status(404).send({
            message: 'post Not Found',
          });
        }
        return res.status(200).send(posts);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return posts
      .findById(req.params.postId, {
        /*include: [{
          model: TodoItem,
          as: 'todoItems',
        }],*/
      })
      .then(posts => {
        if (!posts) {
          return res.status(404).send({
            message: 'post Not Found',
          });
        }
        return posts
          .update({
            content: req.body.content || posts.title,
            description: req.body.description || posts.title,
          })
          .then(() => res.status(200).send(posts))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return posts
      .findById(req.params.postId)
      .then(posts => {
        if (!posts) {
          return res.status(400).send({
            message: 'post Not Found',
          });
        }
        return posts
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};