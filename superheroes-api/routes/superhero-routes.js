const superheroesControoler = require('../controllers/superheroes').Superheroes;

module.exports = (app) => {
    app.post('/api/superheroes/create', superheroesControoler.create);
    app.get('/api/superheroes/getByCasa', superheroesControoler.getByCasa);
    app.put('/api/superheroes/update', superheroesControoler.update);
    app.delete('/api/superheroes/delete', superheroesControoler.delete);
}