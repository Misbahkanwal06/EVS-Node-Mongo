

const stuModel = require("./stuModel");

const { createToken, tokenVerification } = require('../security/jwtToken');
const { createHash, comparePass } = require('../utils');
const { MongoClient, ObjectId } = require('mongodb');

const stuCreate = async (req, res) => {
    console.log("in student create")
    const { password } = req.body;
    console.log(password);
    try {
        const encryptedPass = password && await createHash(password);
        console.log(encryptedPass);
        const dbcreate = new stuModel({
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


const stuView = async (req, res) => {
    const userRes = await stuModel.find();
    return userRes;
    // res.send(userRes);
}


const stuUpdate = async (req, res) => {
    try {
        console.log(req.params.id);
        const objID = new ObjectId(req.params.id);
        console.log(objID);
        const permId = new ObjectId(req.body.permissions);
        console.log(permId);
        const userRes = await stuModel.updateOne({ _id: objID }, 
            { 
            name:req.body.name,
            $addToSet: { permissions: permId } });
        console.log("User Res")
        console.log(userRes)
        return userRes;
    }
    catch (e) {
        console.log(e)
    }
}
 
const stuDelete = async (req, res) => {
    console.log(req.params.id);
    const objid = new ObjectId(req.params.id);
    const userRes = await stuModel.deleteOne({ _id: objid });
    return userRes;
}


const stuLogin = async (req, res) => {
    try {
        const { password } = req.body;
        const userObj = await stuModel.findOne({ email: req.body.email });
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
                    // console.log(uRes);
                    return uRes;
                }
            }
            // return userObj.password === req.body.password ? "successful" : "invalid user";
        }
    } catch (error) {
        res.send(error);
    }
}

const verifyToken = async (req, res) => {
    const { auth } = req.headers;
    console.log(auth);
    try {
        let authResp = auth && await tokenVerification(auth)
        console.log(authResp)
        if (authResp.isValid) return authResp.message
        else if (!authResp.isValid) throw authResp.message;
    } catch (error) {
        res.send(error);
    }
}

module.exports = { stuCreate, stuView, stuUpdate, stuDelete, stuLogin, verifyToken };