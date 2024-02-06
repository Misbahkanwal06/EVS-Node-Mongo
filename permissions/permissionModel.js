
const { Schema, model } = require('mongoose');


const permissionSchema = Schema({
    name: String,
    route: String,
    creationDate:{ type: Date, default: Date.now},
})

const permissionModel = model('Permission',permissionSchema);
module.exports = permissionModel;

// Practice
