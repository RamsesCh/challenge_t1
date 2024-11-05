import usersModel from '../_models/users.js'
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;

class usersController {
    constructor(){}

    async login(req, res) {
        try {
            const dataUser = await usersModel.login(req.body);
            if (dataUser) {
              const acc_tk = jwt.sign({
                sub: dataUser._id,
                name: dataUser.mail,
                exp: Date.now() + 600 * 1000
              }, secret);

              await usersModel.registerToken(acc_tk, req.body);
              
              res.status(200).json({ acc_tk });
            } else {
              res.status(500).json({error:"El usuario no es valido"});
            }
            
        } catch (e) {
            res.status(500).send({error: e.message})
        }
    }

    async logOut(req, res){
      try {
        if (req.headers.authorization) {
          const token = req.headers.authorization.split(" ")[1];
          const idToken = await usersModel.getDataToken(token);
          const data = await usersModel.deleteToken(idToken._id);
          res.status(200).json(data);
        } else {
          res.status(401).send({ error: "authorization required" });
        }
        
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    }
}

export default new usersController();