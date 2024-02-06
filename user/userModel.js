
const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: "Email address is required"
    },
    password:String,
    permissions:[{ type: Schema.Types.ObjectId, ref:'Permission'}],
    token: String,
    creationDate:{ type: Date, default: Date.now},
})

const userModel = model('crud',userSchema);
module.exports = userModel;
