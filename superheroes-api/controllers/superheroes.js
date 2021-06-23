const { verifyHelper } = require("../helpers/verify-helpers");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const db = require('../connection/connection').DB;
const COLLECTION_NAME = "characters"
module.exports.Superheroes = {
    
    async create(req, res){
        console.info("superheroeController - create - START");
        let verifyResponse = verifyHelper.verifyPersonaje(req, requestMethodAction.CREATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("verifyHelper - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("verifyHelper - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                personajes: null
            });
        }

        try {
            var characters = await db.connectToCollection(COLLECTION_NAME);
            let result = await characters.insertOne(verifyResponse.personaje);
            console.info("superheroeController - create - END ok");
            if(result.result.ok){
                return res.status(200).send({
                    exito: true,
                    mensaje: 'Tu personaje se guardó correctamente.',
                    personajes: null
                })
            } else {
                return res.status(400).send({
                    exito: false,
                    mensaje: 'Error al intentar guardar tu personaje.',
                    personajes: null
                })
            }
        } catch (error) {
            console.info("superheroeController - create - END con error ", error);
            return res.status(200).send({
                exito: false,
                mensaje: 'Error al intentar guardar tu personaje',
                personajes: null
            })
        }
    },

    async update(req, res){
        console.info("superheroeController - update - START");
        let verifyResponse = verifyHelper.verifyPersonaje(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("verifyHelper - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("verifyHelper - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                personajes: null
            });
        }

        try {
            
            const query = { personaje: verifyResponse.personaje.personaje };
            const options = {upsert: true};

            var characters = await db.connectToCollection(COLLECTION_NAME);
            let result = await characters.replaceOne(query, verifyResponse.personaje, options);

            console.info("superheroeController - update - END ok");
            if (result.modifiedCount === 0 && result.upsertedCount === 0) {
                return res.status(400).send({
                    exito: false,
                    mensaje: 'Tu personaje no se ha modificado.',
                    personajes: null
                })
              } else {
                return res.status(200).send({
                    exito: true,
                    mensaje: 'Tu personaje se modificó correctamente.',
                    personajes: null
                })
              }
        } catch (error) {
            console.info("superheroeController - update - END con error ", error);
            return res.status(200).send({
                exito: false,
                mensaje: 'Error al intentar modificar tu personaje',
                personajes: null
            })
        }
    },

    async delete(req, res){
        console.info("superheroeController - delete - START");
        let verifyResponse = verifyHelper.verifyPersonaje(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("verifyHelper - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("verifyHelper - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                personajes: null
            });
        }

        try {
            const query = { personaje: verifyResponse.personaje.personaje };

            var characters = await db.connectToCollection(COLLECTION_NAME);
            let result = await characters.deleteOne(query);

            if (result.deletedCount === 1) {
                return res.status(200).send({
                    exito: true,
                    mensaje: 'Tu personaje se borró correctamente.',
                    personajes: null
                })
              } else {
                return res.status(400).send({
                    exito: false,
                    mensaje: 'Tu personaje no se ha borrado.',
                    personajes: null
                })
              }
        } catch (error) {
            console.info("superheroeController - delete - END con error ", error);
            return res.status(200).send({
                exito: false,
                mensaje: 'Error al intentar borrar tu personaje',
                personajes: null
            })
        }
    },

    async getByCasa(req, res){
        console.info("superheroeController - getByCasa - START");

        try {

            //Obtengo la casa enviada
            let house = req && req.query && req.query.casa && req.query.casa != "null" ? req.query.casa : null;

            // creo los parámetros de búsqueda por casa si es aplicable
            let findBy = {};
            if(house){
                findBy.casa = house;
            }
            
            // creo una conexión a la colleción
            var characters = await db.connectToCollection(COLLECTION_NAME);

            // hago la búsqueda según los parámetros
            let result = characters.find(findBy, {sort: {personaje: 1}});

            // parseo el resultado como una lista para poder devolverlo
            let finded = await result.toArray();

            // verifico que el resultado parseado no sea nulo
            if(finded != null){
                return res.status(200).send({
                    exito: true,
                    mensaje: 'Tu personaje se guardó correctamente.',
                    personajes: finded
                })
            } else {
                return res.status(400).send({
                    exito: false,
                    mensaje: 'Error al intentar obtener tu lista de superheroes.',
                    personajes: []
                })
            }
        } catch (error) {
            console.info("superheroeController - getByCasa - END con error ", error);
            return res.status(400).send({
                exito: false,
                mensaje: 'Error al intentar guardar tu personaje',
                personajes: null
            })
        }
    }
}