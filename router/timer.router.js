const router = require('express').Router();

module.exports = (wagner) => {

    const timerController = wagner.invoke((Timer) =>
      require('../controllers/timer.controller')(Timer));

    router.get('/:type', (req, res) =>
      timerController.getByType(req, res));

    router.post('/create', (req, res) =>
      timerController.createTimer(req, res));

    router.put('/:id', (req, res) =>
      timerController.updateById(req, res));

    router.delete('/:id', (req, res) =>
      timerController.deleteById(req, res));

    return router;
};
