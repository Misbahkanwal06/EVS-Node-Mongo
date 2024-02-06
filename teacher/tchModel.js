
const { Schema, model } = require('mongoose');
const tchSchema = Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: "Email address is required"
    },
    password: String,
    token: String,
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
    creationDate: { type: Date, default: Date.now },
})

const tchModel = model('Teacher', tchSchema);
module.exports = tchModel;