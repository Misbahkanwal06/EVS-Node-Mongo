
const tchController = require('./tchController');

const stuRoutes = (fastify,options,done)=>{
    fastify.post('/create',tchController.tchCreate );
    fastify.get('/view-all', tchController.tchView);
    fastify.post('/update/:id',tchController.tchUpdate);
    fastify.delete('/delete/:id',tchController.tchDelete);
    fastify.post('/login',tchController.tchLogin);
    fastify.get('/verify',tchController.verifyToken);
    done();
}

module.exports = stuRoutes;

