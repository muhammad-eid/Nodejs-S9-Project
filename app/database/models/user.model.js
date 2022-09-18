const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
//user => name, age, email, address, image, password, status
const UserSchema = mongoose.Schema(
    {
        name:{type:String, required:true },
        email:{type:String, required:true, unique:true },
        password:{type:String, required:true },
        status:{type:Boolean, default:true },
        age:{type:Number, required:true },
        address:{type:String },
        image:{type:String },
    },
    {timestamps: true}
)
UserSchema.methods.toJSON = function(){
    const data = this.toObject()
    // delete data.password
    delete data.__v
    return data
}

UserSchema.pre("save", async function (req, res) {
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password,  12);
    }
})

UserSchema.statics.login = async(email, password)=>{
    const user = await UserModel.findOne({email});
    if(!user) throw new Error('Email or password is not correct')
    const isValid = await bcryptjs.compare(password, user.password)
    if(!isValid) throw new Error('Email or password is not correct')
}

UserSchema.statics.checkPass = async(user, oldPass) => {
    const isValid = await bcryptjs.compare(oldPass, user.password)
    return isValid
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel