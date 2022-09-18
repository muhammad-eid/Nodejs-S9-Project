const UserModel = require('../database/models/user.model')
class User{
    static home = (req, res)=>{
        res.redirect('/profile')
    }
    static profile = async(req, res)=>{
        res.send({'profile':'ok'})
    }
    static addImage = async(req, res)=>{
        res.send({'addImage':'ok'})
    }
    static register = async(req, res)=>{
        try{
            const user = await UserModel(req.body).save()
            res.status(200).send({
                apiStatus: true,
                data:user,
                message: 'User created'
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data:String(e),
                message: e.message
            })
        }
    }
    static login = async(req, res)=>{
        try{
            const user = UserModel.login(req.body.email, req.body.password);
            res.send({
                apiStatus: true,
                data:user,
                message: 'User logged in'
            })
        }
        catch(e){
            console.log(e)
            res.status(500).send({
                apiStatus: false,
                data:e.message,
                message: 'User didnt logged in'
            })
        }
    }
    static logout = async(req, res)=>{
        res.send({'logout':'ok'})
    }
    static edit = async(req, res)=>{
        try{
            //user => name, age, email, address, image, password, status
            const acceptedData = ['id', 'name', 'age', 'email', 'address', 'image']
            if(!Object.keys(req.body).every(item=>acceptedData.includes(item))) throw new Error("unaccepted data")
            await UserModel.findByIdAndUpdate(req.body.id ,req.body)
            res.status(200).send({
                apiStatus: true,
                data: req.body,
                // data: (await UserModel.findById(req.body.id)),
                message: 'User updated'
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data:String(e),
                message: e.message
            })
        }
    }
    static editPassowrd = async(req, res)=>{
        try{
            const acceptedData = ['id', 'passowrd']
            if(!Object.keys(req.body).every(item=>editableData.includes(item))) throw new Error("unaccepted data")
            const user = await UserModel.find(req.body.id)
            user.password = req.body.password
            await user.save()
            res.status(200).send({
                apiStatus: true,
                data: 'User password updated',
                message: 'User password updated'
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data:String(e),
                message: e.message
            })
        }
    }
    static viewAll = async(req, res)=>{
        try{
            const users = await UserModel.find()
            res.status(200).send({
                apiStatus: true,
                data: users,
                message: 'View Users'
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data:String(e),
                message: e.message
            })
        }
    }
    static viewOne = async(req, res)=>{
        try{
            const user = await UserModel.findById(req.params.id)
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: 'View User'
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data:String(e),
                message: e.message
            })
        }
    }
    static activate = async(req, res)=>{
        try{
            //user => name, age, email, address, image, password, status
            const acceptedData = ['id', 'status']
            if(!Object.keys(req.body).every(item=>acceptedData.includes(item))) throw new Error("unaccepted data")
            await UserModel.findByIdAndUpdate(req.body.id ,{status : true})
            res.status(200).send({
                apiStatus: true,
                data: acceptedData,
                message: 'User activated'
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data:String(e),
                message: e.message
            })
        }
    }
    static deactivate = async(req, res)=>{
        try{
            //user => name, age, email, address, image, password, status
            const acceptedData = ['id', 'status']
            if(!Object.keys(req.body).every(item=>acceptedData.includes(item))) throw new Error("unaccepted data")
            await UserModel.findByIdAndUpdate(req.body.id ,{status : false})
            res.status(200).send({
                apiStatus: true,
                data: acceptedData,
                message: 'User deactivated'
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data:String(e),
                message: e.message
            })
        }
    }
    static delete = async(req, res)=>{
        try{
            await UserModel.findByIdAndDelete(req.body.id)
            res.status(200).send({
                apiStatus: true,
                data: req.body.id,
                message: 'User deleted'
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus: false,
                data:String(e),
                message: e.message
            })
        }
    }   
}

module.exports = User