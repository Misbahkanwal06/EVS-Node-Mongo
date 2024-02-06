

const tchModel = require("./tchModel");
const { createToken, tokenVerification} = require('../security/jwtToken');
const { createHash, comparePass } = require('../utils');
const { MongoClient, ObjectId } = require('mongodb');


const tchCreate = async (req, res) => {
    const { password } = req.body;
    console.log(password);
    try {
        const encryptedPass = password && await createHash(password);
        console.log(encryptedPass);
        const dbcreate = new tchModel({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPass,
        })
        const userRes = await dbcreate.save();
        console.log(userRes);
        res.send(userRes);
    } catch (error) {
        res.send(error);
    }
}

const tchView = async (req,res)=>{
    const userRes = await tchModel.find();
    return userRes;
    // res.send(userRes);
}

// { $set: { name: req.body.name, email: req.body.email, password: req.body.password,} }
const tchUpdate = async(req,res)=>{
    console.log(req.params.id);
    const objID = new ObjectId(req.params.id);
    console.log(objID);

    const permId = new ObjectId(req.body.permissions);
    // const permId = req.body.permissions;
    console.log("hashdghasg");
    console.log(permId);
    // const userRes = await tchModel({_id:objID},{$addToSet:{per}})
    const userRes = await tchModel.updateOne(
        { _id: objID },
        {$addToSet:{permissions:permId}} 
        // { $addToSet: {permissions: permId } }
        );
    return userRes;
}
 
const tchDelete =async(req,res)=>{
    console.log(req.params.id);
    const objid = new ObjectId(req.params.id);
    const userRes = await tchModel.deleteOne({ _id: objid });
    return userRes;
}


const tchLogin = async(req,res)=>{
    try {
        const { password } = req.body;
        const userObj = await tchModel.findOne({ email: req.body.email });
        if (!userObj) {
            res.send("User Not Exist");
        } else {
            const bcryptRes = await comparePass(password, userObj.password)
            console.log(bcryptRes);
            if (!bcryptRes) {
                res.send("Invalid password");
            } else {
                let token = await createToken(userObj);
                // return token;
                if (token) {
                    console.log("In iff")
                    res.send("successfull login");
                    userObj.token = token;
                    const uRes = await userObj.save();
                    console.log(uRes);
                    return uRes;
                }
            }
            // return userObj.password === req.body.password ? "successful" : "invalid user";
        }
    } catch (error) {
        res.send(error);
    }
}

const verifyToken = async(req,res)=>{
    const {auth} = req.headers;
      console.log(auth);
      try {
       let authResp = auth && await tokenVerification(auth)       
       console.log(authResp)
       if(authResp.isValid) return authResp.message
       else if(!authResp.isValid) throw authResp.message;
      } catch (error) {
        res.send(error);
      }
}

module.exports = {tchCreate, tchView, tchUpdate,tchDelete, tchLogin, verifyToken};