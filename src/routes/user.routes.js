import {Router} from 'express';
import  UserController  from '../controllers/UserController';

const router = Router();

//New Usuario
router.post('/register',UserController.newUsuario);

//Get All Users
router.get('/list',UserController.getAllUsers);

// Get user by id
router.get('/list/:id',UserController.getById);

//Update user
router.put('/update/:id',UserController.updateUser);

//Change password
router.put('/change-pass/:id',UserController.changePassword);

//Delete user
router.delete('/delete/:id',UserController.deleteUser);

export default router;
