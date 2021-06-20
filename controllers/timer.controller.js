const handler = require('../utils/handler');
const status = require('http-status');

let _timer;

const getByType = (req, res) => {
    const { type } = req.params;
    _timer.find({ type: type })
        .sort({})
        .exec(handler.handleOne.bind(null, 'timers', res));
};

const createTimer = (req, res) => {
    const timer = req.body;

    _timer.create(timer)
        .then(
            (data) => {
                res.status(status.OK);
                res.json({ msg: 'Timer creado correctamente', data: data });
            }
        )
        .catch(
            (err) => {
                res.status(status.BAD_REQUEST);
                res.json({ msg: 'No se ha creado', data: err })
            }
        )

};

const deleteById = (req, res) => {
    const id = req.params.id;

    _timer.remove({ _id: id }, (err, data) => {
        if (err) {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "No se pudo realizar la operación, intente nuevamente" });
        } else {
            res.status(status.OK);
            res.json({ msg: "El timer se eliminó correctamente" });
        }
    });
};

const updateById = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = { _id: id };

    _timer.findOneAndUpdate(query, newData, (err, data) => {
        if (err) {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "No se realizar la operación, intente nuevamente" });
        } else {
            res.status(status.OK);
            res.json({ msg: "El timer se modificó correctamente" });
        }
    });
};

module.exports = (Timer) => {
    _timer = Timer;
    return ({
        getByType,
        createTimer,
        updateById,
        deleteById,
    });
}
