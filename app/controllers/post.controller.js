const UserModel = require('../database/models/user.model')
class User{

    static createPost = async(req, res)=>{
        try{
            const post = await UserModel(req.body).save()
            res.status(200).send({
                apiStatus: true,
                data:user,
                message: 'post created'
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