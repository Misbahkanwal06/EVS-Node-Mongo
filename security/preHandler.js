
const { tokenVerification } = require("./jwtToken");
const checkUserAllowedRoutes = require("./userPermissions");



const handleRequest = (fastify) => {
    fastify.addHook('onRequest', async (req, reply) => {
        try {
            console.log("prehandler Practice");
            let currentUrl = req.url;
            console.log("currenturl", currentUrl);
            const insecureRoutes = ['/api/v2/student/view-all', "/api/v2/student/delete", '/api/v2/teacher/view-all'
                , '/api/v2/teacher/delete/'];
            let indexRes = insecureRoutes.indexOf(currentUrl);
            console.log("indexRes", indexRes);

            if (indexRes == '-1'){
                // console.log("req-header-auth", req.headers);
                let currentToken = req.headers.auth;
                if (!currentToken) throw 'token not available';
                let tokenVerificationRes = currentToken && tokenVerification(currentToken);
                console.log("tokenVerificationRes:",tokenVerificationRes);  // it will return whole obj including permissions
                let { id } = tokenVerificationRes;
                let userObjRes = await checkUserAllowedRoutes(id,currentUrl);
                console.log("userObjRes", userObjRes);
                if (!userObjRes) throw "requested route not in a permission array";
            } else {
                console.log("current url matches with insecure Routes");
                return "current url matches with insecure Routes";
            }
        } 
        catch (error) {
            console.log(error);
            return error;
        }
    })
}

module.exports = handleRequest;
