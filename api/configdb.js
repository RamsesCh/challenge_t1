import { MongoClient } from "mongodb";

class configdb {
    constructor(){
        const uri = "mongodb+srv://ramseschav:OxTJm6ki58V9vNCa@cluster0.6ypks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        this.client = new MongoClient(uri);
        this.connectionDB();
    }

    async connectionDB(){
        try {
            await this.client.connect();
            this.db = this.client.db('api');
            console.log("Conexion a mongo exitosa...");
        } catch (e) {
            console.log(e);
        }
    }
}

export default new configdb();