import usersModel from '../_models/users.js'

class usersController {
    constructor(){}

    async login(req, res) {
        try {
            const dataUser = await usersModel.login(req.body);
            if (dataUser.length) {
              const sessionTkn = "abcdef-12345678";
              res.status(200).json({"acc_tk": sessionTkn});
            } else {
              res.status(500).json({"err":"El usuario no es valido"});
            }
            
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

export default new usersController();