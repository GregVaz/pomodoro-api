const router = require('express').Router();

module.exports = (wagner) => {

    const userController = wagner.invoke((User) =>
      require('../controllers/user.controller')(User));

    router.get('/:id', (req, res) =>
      userController.getById(req, res));

    router.post('/login', (req,res) =>
      userController.login(req,res));

    router.post('/signup', (req, res) =>
      userController.createUser(req, res));

    router.post('/validate', (req, res) =>
      userController.validateSession(req, res));

    router.put('/:id', (req, res) =>
      userController.updateById(req, res));

    router.delete('/:id', (req, res) =>
      userController.deleteById(req, res));

    return router;
};
