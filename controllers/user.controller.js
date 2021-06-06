const handler = require('../utils/handler');
const bcrypt = require('bcryptjs');
const status = require('http-status');
const jwt = require('jsonwebtoken');

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
    const user = req.body;
    const myPassword = user.password;

    _user.findOne({ email: user.email }).sort({}).then(data => {
        //Validar si el email existe en la BD
        if(!data){
            res.status(status.NOT_FOUND);
            res.json({ msg: 'Correo y/o contraseña incorrectos' });
        }else{
            const hash = data.password;
            if(!bcrypt.compareSync(myPassword, hash)){
                res.status(status.UNAUTHORIZED);
                res.json({ msg: 'Contraseña incorrecta' });
            }else{
                //En este punto el usuario y la contraseña son correctos entonces podemos otorgar un token
                const payload = { admin: true };
                token = jwt.sign(payload, 'secret', { expiresIn: '24h' });
                // Retorna la información incluido el json token
                res.json({
                    token: token,
                    user: data
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

module.exports = (User) => {
    _user = User;
    return ({
      getById,
      login,
      createUser,
      updateById,
      deleteById,
    });
}