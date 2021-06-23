const mongo = require('mongodb');
const config = require('./config').CONFIG_1;
const mongoClient = mongo.MongoClient;
//const url = config.type+"://"+config.user+":"+config.pass+"@"+config.host+":"+config.port+"/";
const url = config.type+"://"+config.host+":"+config.port+"/";
/*const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT,
    TYPE
} = process.env;*/

//const url = TYPE+"://"+MONGO_HOSTNAME+":"+MONGO_PORT+"/";

module.exports.DB = {

    async connectToDB() {
        try {
            console.log('url');
            console.log(url);
            const data = await mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            const db = data.db(config.db, {returnNonCachedInstance: true});
            //console.log('mongo_db');
            //console.log(MONGO_DB);
            //const db = data.db(MONGO_DB, {returnNonCachedInstance: true});
            console.log("Conectado al servidor de mongo");
            return db;
        } catch (err) {
            console.log("Error al intentar conectar a mongo ", err);
            return null;
        }
    },

    async connectToCollection(collectionName){
        try {
            const conexion = await this.connectToDB();
            const collection = conexion.collection(collectionName);
            console.log("Conectado a la coleccion "+collectionName);
            return collection;
        } catch (err) {
            console.log("Error al intentar conectar a mongo ", err);
            return null;
        }
    }
}