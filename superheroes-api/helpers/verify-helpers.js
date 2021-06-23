var httpRequestActions = require('./constant-helpers').REQUEST_METHODS_ACTION;

module.exports.verifyHelper = {
    verifyPersonaje(req, userAction){
        console.log("verifyHelper - verifyPersonaje - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let personaje = req.body && req.body.personaje ? req.body.personaje : null;

        let errorsList = [];
        let parsedPersonaje = {};

        //verifico que existan keys
        if(keys == null || keys.length <= 0){
            errorsList.push('El personaje enviado no tiene ningún atributo.');
        } else if(keys.length > 0 && (req.body.casa == null || personaje == null) && userAction == httpRequestActions.CREATE){
            errorsList.push('No se envíaron alguno de los siguientes datos: casa o personaje.');
        }

  
        if(userAction != httpRequestActions.DELETE){
            parsedPersonaje = req.body;
        } else{
            parsedPersonaje.personaje = personaje;
        }

        console.log("verifyHelper - verifyPersonaje - END");
        return {errors: errorsList, personaje: parsedPersonaje};
    },
}