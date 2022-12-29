import User from '../models/Users';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import config from '../config';

class UserController {
    //New user
    static newUsuario = async(req,res)=>{
        const data = req.body;
        let newUser = new User();
        newUser.name = data.name;
        newUser.email = data.email;
        newUser.password = newUser.encryptPassword(data.password);
        newUser.role = data.role;
        
        try {
            const userSaved = await newUser.save();
            res.status(200).json({
                message:'User created!',
                user:userSaved
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Something goes wrong creating a user!"
            });
        }
    };

    //Get users
    static getAllUsers = async(req,res)=>{
        try {
            const users = await User.find();
            res.status(200).json({
                message:'Users list',
                users:users
            });
        } catch (error) {
            res.status(500).json({
                message: "Something goes wrong retrieving users!"
            });
        }
    }

    //Get user by id
    static getById = async(req,res)=>{
        const {id} = req.params;
        try {
            const userFound = await User.findById(id);
            res.status(200).json({
                message:'User details!',
                user:userFound
            });
        } catch (error) {
            res.status(500).json({
                message:`Error retrieving a user with id: ${id}`
            });
        }
    }

    //Update user
    static updateUser = async(req,res)=>{
        const {id} = req.params;
        const {name,email,role} = req.body;
        try {
            const userUpdate = await User.findByIdAndUpdate(id,{name:name,email:email,role:role})
            res.status(200).json({
                message:'User Update!',
                user:userUpdate
            });
        } catch (error) {
            res.status(500).json({
                message:`Something goes wrong updating user with id ${id}`
            });
        }
    }

    //Delete user
    static deleteUser = async(req,res)=>{
        const {id} = req.params;
        try {
            const userDelete = await User.findByIdAndDelete(id);
            res.status(200).json({
                message:`Succesful deleting user with id ${id}`,
                user:userDelete
            });
        } catch (error) {
            res.status(500).json({
                message:`Something goes wrong deleting user with id ${id}`
            });
        }
    }

    //Change password
    static changePassword = async(req,res)=>{
        const {id} = req.params;
        const {newPass, confirmPass} = req.body;
        const user = new User();
        if(newPass != confirmPass){
            return res.status(401).json({
                message:'Passwords are not same!'
            });
        }
        try {
            let passEncrypt = user.encryptPassword(newPass);
            const passModified = await User.findByIdAndUpdate(id,{password:passEncrypt});
            res.status(200).json({
                message:'Password updated!',
                passModified
            });
        } catch (error) {
            res.status(500).json({
                message:'Something goes wrong!'
            });
        }
    }
}
export default UserController;
