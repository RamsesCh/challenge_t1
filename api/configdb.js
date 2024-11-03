import { MongoClient } from "mongodb";

class configdb {
    constructor(){
        const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_SERVER}/?retryWrites=true&w=majority&appName=${process.env.CLUSTER_NAME}`;
        this.client = new MongoClient(uri);
        this.connectionDB();
    }

    async connectionDB(){
        try {
            await this.client.connect();
            this.db = this.client.db(process.env.DB_NAME);
            console.log("Conexion a mongo exitosa...");
        } catch (e) {
            console.log(e);
        }
    }
}

export default new configdb();