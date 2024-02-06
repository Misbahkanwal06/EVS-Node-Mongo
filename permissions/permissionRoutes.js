


const permissionController = require('./permissionController');

const permissionRoutes = (fastify,options,done)=>{
    fastify.post('/create', permissionController.create);
    done();
}

module.exports = permissionRoutes;

