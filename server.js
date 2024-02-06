
const path = require('path');
const mongoose = require("./dbs");


require('dotenv').config({
  path:path.join(__dirname,`.env.${process.env.NODE_ENV}`)
});


// require('dotenv').config({
//   path:path.join(__dirname,`.env.${process.env.NODE_ENV}`)
// });

const mainRoutes = require("./mainRoutes");
const handleRequest  = require("./security/preHandler");
const fastify = require('fastify')({
 logger: true
})


// const { tokenVerification } = require('./security/jwtToken');
// const checkUserRoutes = require('./security/userPermissions');
// const checkUserAllowedRoutes = require('./security/userPermissions');

// console.log("path",path)
// console.log( "Local",process.env.NODE_ENV)
// console.log("directory name",__dirname);


//  pre-handlers Practice
handleRequest(fastify);


// fastify.addHook('onRequest', async (req, reply) => {
//   try {
//     console.log("prehandler Practice");
//     let currentUrl = req.url;
//     // console.log("currenturl",currentUrl);
//     const insecureRoutes = ['/api/v2/student/view-all', "/api/v2/student/delete", '/api/v2/teacher/view-all'
//       , '/api/v2/teacher/delete/'];
//     let indexRes = insecureRoutes.indexOf(currentUrl);
//     // console.log("indexRes",indexRes);
//     if (indexRes == '-1') {
//       console.log("req-header-auth", req.headers);
//       let currentToken = req.headers.auth;
//       if (!currentToken) throw 'token not available';
//       let tokenVerificationRes = currentToken && tokenVerification(currentToken);
//       console.log("tokenVerificationRes:", tokenVerificationRes);  // it will return whole obj including permissions
//       let { id } = tokenVerificationRes;
//       let userObjRes = await checkUserAllowedRoutes(id, currentUrl);

//       if (!userObjRes) throw "route not found";
//       console.log("userObjRes", userObjRes);
//     } else {
//       return "current url matches with insecure Routes";
//     }
//   } catch (error) {
//     return error
//   }
// })





// //     // Prehandlers
// fastify.addHook('onRequest', async (req, reply) => {
//   try {
//     console.log("Pre handler");
//     // '/api/v2/student/login'
//     // "/api/v2/teacher/update"
//     let insecureRoutes = ['/api/v2/user/view-all', '/api/v2/student/create', '/api/v2/student/login'];
//     console.log(insecureRoutes);
//     let url = req.url;
//     console.log(url);
//     let routeResp = insecureRoutes.indexOf(req.url);
//     console.log("Route  Resp");
//     console.log(routeResp);
//     if (routeResp == '-1') {
//       let token = req.headers.auth;
//       if (!token) throw "Token not found";
//       let userObj = token && tokenVerification(token);
//       // console.log("UserObj");
//       console.log(userObj);
//       const { id } = userObj;
//       console.log(id);
//       const ress = await checkUserRoutes(id, url);
//       if (!ress) throw "route not found";
//       console.log("ress");
//     }
//   }
//   catch (error) {
//     throw error;
//   }
// });


// console.log("port");
// console.log(process.env.PORT);

fastify.register(mainRoutes,{ prefix: "/api/v2" });
fastify.listen({ port: process.env.PORT}, function (err, address) {
  console.log(`Server is running on ${process.env.PORT}`)
  if (err) {
    fastify.log.error(err);
    process.exit(1)
  }
});


