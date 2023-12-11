import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js";
import { varifyToken } from "../middleware/auth.js";

const router = express.Router();
//varify token in all cases;
router.use(varifyToken);
//get user 
router.get("/:id", getUser);
// get user friends
router.get("/:id/friends", getUserFriends);
//update 
router.patch("/:id/:friendId", addRemoveFriend);
// router.patch("/:id/:friendId", (req, res) => {
//     const { id, friendId } = req.params;
//     res.status(200).json({id, friendId });
// });



export default router;
