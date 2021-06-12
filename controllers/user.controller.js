const handler = require('../utils/handler');
const bcrypt = require('bcryptjs');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require('../_config');

let _user;
let token;


const getById = (req, res) => {
  const { id } = req.params;

  if (id.toString().length != 24) {
      res.status(status.UNAUTHORIZED);
      res.json({ err: "Identificador inválido" });
  } else {
      _user.find({ _id: id })
          .sort({})
          .exec(handler.handleOne.bind(null, 'user', res));
  }
};

const login = (req,res) => {
    const { email, password } = req.body;

    _user.findOne({ email: email }).sort({}).then(data => {
        //Validar si el email existe en la BD
        if(!data){
            res.status(status.NOT_FOUND);
            res.json({ msg: 'Correo y/o contraseña incorrectos' });
        }else{
            const hash = data.password;
            if(!bcrypt.compareSync(password, hash)){
                res.status(status.UNAUTHORIZED);
                res.json({ msg: 'Contraseña incorrecta' });
            }else{
                //En este punto el usuario y la contraseña son correctos entonces podemos otorgar un token
                const payload = { data };
                token = jwt.sign(payload, _config.secret, { expiresIn: '24h' });
                // Retorna la información incluido el json token
                res.json({
                    token: token,
                    user: {name: data.name, controlNumber: data.controlNumber, email: data.email}
                });
            }
        }
    })
        .catch(
            (err) => {
                res.status(status.INTERNAL_SERVER_ERROR);
                res.json({ msg: 'Error: ', data: err })
            }
        );

};

const createUser = (req, res) => {
    const user = req.body;
    const myPlaintextPassword = user.password;
    console.log(user);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(myPlaintextPassword, salt);

    user.password = (hash);
    _user.create(user)
        .then(
            (data) => {
                res.status(status.OK);
                res.json({ msg: 'User creado correctamente', data: data });
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

    _user.remove({ _id: id }, (err, data) => {
        if (err) {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "No se pudo realizar la operación, intente nuevamente" });
        } else {
            res.status(status.OK);
            res.json({ msg: "El      se eliminó correctamente" });
        }
    });
};

const updateById = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = { _id: id };

    _user.findOneAndUpdate(query, newData, (err, data) => {
        if (err) {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "No se realizar la operación, intente nuevamente" });
        } else {
            res.status(status.OK);
            res.json({ msg: "El user se modificó correctamente" });
        }
    });
};

const validateSession = (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, _config.secret);
        if (decoded) {
            res.status(status.OK).json({session: true});
        } else {
            res.status(status.BAD_REQUEST).json({session: false});
        }
    } catch(err) {
        res.status(status.BAD_REQUEST).json({session: false});
    }
};

module.exports = (User) => {
    _user = User;
    return ({
      getById,
      login,
      createUser,
      updateById,
      deleteById,
      validateSession
    });
}
