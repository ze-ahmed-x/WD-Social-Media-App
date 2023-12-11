import express from "express";
import { login }  from "../controllers/auth.js"

const router = express.Router();


router.post("/login", login);
// router.post("/login", ()=> {
//     console.log("am here")
// })

export default router;