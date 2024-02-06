


const userController = require('./userController');

const userRoutes = (fastify,options,done)=>{
    fastify.post('/create', userController.userCreate);
    fastify.get('/view-all', userController.viewAll);
    fastify.get('/view/:id', userController.userView);
    fastify.post('/update/:id',userController.userUpdate);
    fastify.delete('/delete/:id',userController.userDelete);
    fastify.post('/login',userController.userLogin);
    fastify.get('/verify',userController.verifyToken);
    done();
}

module.exports = userRoutes;


