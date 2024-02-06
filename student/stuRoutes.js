


const stuController = require('./stuController');

const stuRoutes = (fastify,options,done)=>{
    fastify.post('/create',stuController.stuCreate );
    fastify.get('/view-all', stuController.stuView);
    fastify.post('/update/:id',stuController.stuUpdate);
    fastify.delete('/delete/:id',stuController.stuDelete);
    fastify.post('/login',stuController.stuLogin);
    fastify.get('/verify',stuController.verifyToken);
    done();
}

module.exports = stuRoutes;