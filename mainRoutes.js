

const userRoutes = require('./user/userRoutes');
const stuRoutes = require('./student/stuRoutes');
const permissionRoutes = require('./permissions/permissionRoutes');
const tchRoutes = require('./teacher/tchRoutes');

const mainRoutes = (fastify,options,done)=>{
    fastify.register(userRoutes,{prefix:"/user"});
    fastify.register(permissionRoutes,{prefix:"/permission"});
    fastify.register(stuRoutes,{prefix:'/student'});
    fastify.register(tchRoutes,{prefix:'/teacher'});
    done();
}

module.exports = mainRoutes;


