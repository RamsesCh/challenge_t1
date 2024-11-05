import configdb from "../configdb.js";
import { ObjectId } from "mongodb";

const dbCollection = "users";
const tokenDbCollection ="auth_whitelist";

class usersModel {

  async login(dataUser) {
    const users = configdb.db.collection(dbCollection);
    return await users.findOne({ mail: dataUser.mail, pass: dataUser.pass })
  }

  async registerToken(token, dataUser) {
    const comments = configdb.db.collection(tokenDbCollection);
    const data = {
      acc_tk: token,
      mail: dataUser.mail,
      pass: dataUser.pass,
    };
    return await comments.insertOne(data);
  }

  async validateToken(token) {
    const validtoken = configdb.db.collection(tokenDbCollection);
    const tokenDB = await validtoken.findOne({ acc_tk: token });
    
    if(tokenDB){
      return true
    } else {
      return false
    }
  }

  async getDataToken(token){
    const validtoken = configdb.db.collection(tokenDbCollection);
    return await validtoken.findOne({ acc_tk: token });
  }

  async deleteToken(idToken) {
    const tokens = configdb.db.collection(tokenDbCollection);
    return await tokens.deleteOne({ _id: new ObjectId(idToken) });
  }
}

export default new usersModel;