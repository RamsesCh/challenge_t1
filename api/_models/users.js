import configdb from "../configdb.js";

class usersModel {

    async login(dataUser){
        const users = configdb.db.collection("users");
        return await users.find({ mail: dataUser.mail, pass: dataUser.pass }).toArray();
        
    }
}

export default new usersModel;