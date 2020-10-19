const users = require('../models/users.js');
const posts = require('../models/posts.js');
const lodash = require('lodash');
const bcrypt = require('bcrypt');

module.exports = {
   async create(req, res) {
    console.log(req.body.email);
    //let ooo = await users.findOne({email: req.body.email});

    let ooo = await users.findAll({
      limit: 1,
      where: {
        email: req.body.email
      },
      order: [ [ 'createdAt', 'DESC' ]]
    }).then(function(entries){
      if(entries.email) return res.status(400).send("user alredy registered");
    });


    //console.log(ooo.email);
    //if(ooo) return res.status(400).send("user alredy registered");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password ,salt);
    const resault = users
      .create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        age: req.body.age,
      })
/*
create({
  lodash.pick(req.body,['username','email','password','age'])
      })
*/

      .then((users) => {
        return res.status(201).send(lodash.pick(users,['username','email']))
      })
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return users
      .findAll({
        include: [{
          model: posts,
          as: 'posts',
        }],
        /*order: [
          ['createdAt', 'DESC'],
          [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC'],
        ],*/
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return users
      .findById(req.params.userId, {
        include: [{
          model: posts,
          as: 'posts',
        }],
      })
      .then((users) => {
        if (!users) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return res.status(200).send(users);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return users
      .findById(req.params.userId, {
        include: [{
          model: posts,
          as: 'posts',
        }],
      })
      .then(users => {
        if (!users) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return users
          .update({
            username: req.body.username || users.username,
            password: req.body.password || users.password,
            email: req.body.email || users.email,
            age: req.body.age || users.age,
          })
          .then(() => res.status(200).send(users))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return users
      .findById(req.params.userId)
      .then(users => {
        if (!users) {
          return res.status(400).send({
            message: 'user Not Found',
          });
        }
        return users
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};