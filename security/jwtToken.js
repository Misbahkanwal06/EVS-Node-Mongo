
const jwt = require("jsonwebtoken");

const createToken = async (userObj) => {
    let token = await jwt.sign({
        id: userObj._id,
        name:userObj.name,
        email: userObj.email,
        password: userObj.password,
        permissions:userObj.permissions,
    }, 'shhhhh',
        // { expiresIn: '20' }
        );
    console.log("jshcjshjcsdjcns");
    console.log(token);
    return token;
}

const tokenVerification = (auth) => {
    console.log(auth);
    // console.log("In token verification");
    try {
        if(!auth) return{ isVal:false, msg: "No JWT token found"}
        // if (!auth) return { isValid: false, message: "No JWT token found" }
        let verify = jwt.verify(auth,"shhhhh");
        // console.log(verify);
        return verify
        console.log("verify end");
        return { isValid: true, message: "Token verifications successfull" }
    } catch (error) {
    console.log(error);
    }
}



module.exports = { createToken, tokenVerification };