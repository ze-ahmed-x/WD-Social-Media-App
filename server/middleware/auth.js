import jwt from 'jsonwebtoken';
import User from '../models/User.js'

export const varifyToken = async (req, res, next) => {
    try {
        // const { authorization } = req.headers; // same as req.header("Authorization")
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied");
        }
        if (!token.startsWith("Bearer ")) {
            return res.status(403).send("Token not found");
        }
            token = token.slice(7, token.length).trimLeft();
            const user_id = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({_id: user_id.id}).select('_id');
            if (!user) {
                return res.status(401).json({error: 'User not found'})
            }
            req.user = user_id;
            next();
        
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}