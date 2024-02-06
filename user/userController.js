
const userModel = require("./userModel");
const { createHash, comparePass } = require('../utils');
const { createToken, tokenVerification} = require('../security/jwtToken');
const { MongoClient, ObjectId } = require('mongodb');

const userCreate = async (req, res) => {
    console.log(req.body);
    // console.log(req.body.password);
    const { password } = req.body;
    console.log(password);
    try {
        const encryptedPass = password && await createHash(password);
        console.log(encryptedPass);
        // return encryptedPass;
        const dbcreate = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPass
        })
        const userRes = await dbcreate.save();
        console.log(userRes);
        res.send(userRes);
    } catch (error) {
        res.send(error);
    }
}

const viewAll = async (req, res) => {
    const userRes = await userModel.find().populate('permissions')
    return userRes;
    // res.send(userRes);
}

const userView = async (req, res) => {
    // return req.params.id;
    const objId = new ObjectId(req.params.id);
    console.log(objId);
    const userRes = await userModel.findOne({ _id: objId }).populate('permissions');
    res.send(userRes);
    return userRes;
}

const userUpdate = async (req, res) => {
    console.log(req.params.id);
    const objID = new ObjectId(req.params.id);
    const permId=new ObjectId(req.body.permissions);
    console.log(permId)
    const userRes = await userModel.updateOne({ _id: objID }, { $set: { name: req.body.name, email: req.body.email, password: req.body.password,permissions:permId } });
    return userRes;
}
const userDelete = async (req, res) => {
    console.log(req.params.id);
    const objid = new ObjectId(req.params.id);
    const userRes = await userModel.deleteOne({ _id: objid });
    return userRes;
}


const userLogin = async (req, res) => {
    try {
        const { password } = req.body;
        const userObj = await userModel.findOne({ email: req.body.email });
        if (!userObj) {
            res.send("User Not Exist");
        } else {
            const bcryptRes = await comparePass(password, userObj.password)
            console.log(bcryptRes);
            if (!bcryptRes) {
                res.send("Invalid password");
            } else {
                let token = await createToken(userObj);
                if (token) {
                    console.log("In iff")
                    // res.send("successfull login");
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
        
      }
}

module.exports = { userCreate, viewAll, userView, userUpdate, userDelete, userLogin, verifyToken };
