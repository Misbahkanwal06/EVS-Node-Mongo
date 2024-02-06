
const permissionModel = require("./permissionModel");


// const { MongoClient, ObjectId } = require('mongodb');

const create = async(req,res)=>{
    let {name,route} = req.body;
    try{
        let createResp = new permissionModel({
            name,route
        })
        let permission = await createResp.save();
        return permission;
    }
    catch(e){
    return e
    }
}

module.exports = {create};
