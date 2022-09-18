const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
// posts => title, type = [txt, file], content, file
const UserSchema = mongoose.Schema(
    {
        title:{type:String, required:true },
        type:{
            required:true,
            txt:{type:String,},
            file:{type:String,}   
        },
    },
    {timestamps: true}
)
UserSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.__v
    return data
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel