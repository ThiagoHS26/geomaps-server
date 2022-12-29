import  User  from '../models/Users';
import * as jwt from 'jsonwebtoken';
import config from '../config';


class AuthController {
    static login = async(req,res)=>{
        const {email,password} = req.body;
        if(!(email && password)){
            return res.status(400).json({message:'Email or password are required!'});
        }

        let user = new User();

        try {
            user = await User.findOne({email:email});
            if(!user){
                return res.status(400).json({
                    message:`The email ${email} is not registered!`
                });
            }

        } catch (error) {
            return res.status(500).json({
                message:'Something goes wrong!'
            });
        }

        user.comparePassword(password,(err,result)=>{
            if(err){
                return res.status(500).json({message:'Internal server error!'});
            }else if(!result){
                return res.status(400).json({message:'Password incorrect!'});
            }else{
                const token = jwt.sign({id:user.id, email:user.email},config.jwtSecret,{expiresIn:'1h'});
                return res.status(200).json({message:'Authenticated!',token});
            }
        });
        
    }
}

export default AuthController;