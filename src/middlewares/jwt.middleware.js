import * as jwt from 'jsonwebtoken';
import config from '../config';


export const checkJWT = (req,res, next)=>{
    const token = req.headers['token'];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (e) {
        return res.status(401).json({message:'You have no permission!'});
    }
    const {id,email} = jwtPayload;
    const newToken = jwt.sign({id,email},config.jwtSecret, {expiresIn:'1h'});
    next();
};