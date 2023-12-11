import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; //used for handling uploading of files
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js"; //we are exporting "router" in the file and here we have given a different name of variable
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { varifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";


/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __direname = path.dirname(__filename);
dotenv.config(); //now we can access through process
const app = express(); //create the express app - the main bacekend app
//configing middlewares
app.use(express.json()); //so that we can process json coming in web requests
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__direname, 'public/assets'))); //saving locally on a production app it could be amazon s3 or digitalocean etc

/* File Storage: Configuration we get from github repo multer */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage});

/*ideally we should create routes in a folder name 'Routes' and use those as middleware e.g
app.use('/user', userRoutes)
app.use('/feed', mediaFeed)
instaed we are used routes directly here */

app.post("/auth/register", upload.single('picture'), register); // we placed this route here cause we needed this upload file here;
app.post("/posts", varifyToken, upload.single('picture'), createPost);

/* Auth Routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* Feed routes */

// app.use('/feed',varifyToken, (req, res)=> {
//     if (req.user){
//         return res.status(200).json({_id: req.user});
//     }
//     return res.status(400).json({message: "not authorize"});
// })


/* connect with DB */
const port = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected with DB");
    app.listen(port, ()=> {
        console.log("Listening on port: " + port);
    })
}).catch((err)=> {
    console.log("Coudn't connect to DB !" + err);
})






