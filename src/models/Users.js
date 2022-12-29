import {model, Schema} from 'mongoose';
import 'mongoose-type-email';
import * as bcrypt from 'bcryptjs';

const userSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        unique:true,
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }

},{
    versionKey: false,
    timestamps: true
});

//Encrypt the password
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//Check password for Login
userSchema.methods.comparePassword= function (password,callback) {
    bcrypt.compare(password, this.password, function(err,same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    })
};

export default model('User',userSchema);