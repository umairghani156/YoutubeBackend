import express  from "express";
import {update , deleteUser, dislike, getUser, like, subscribe, unsubscribe } from "../controllers/userController.js";
import { verifyToken } from "../VerifyToken.js";

const router = express.Router();
//Update user
router.put("/:id",verifyToken, update)

//delete user
router.delete("/:id",verifyToken, deleteUser)


// get a user
router.get("/find/:id", getUser)


//subscribe a user
router.put("/sub/:id",verifyToken, subscribe)


//unsubscribe a user
router.put("/unsub/:id",verifyToken, unsubscribe)


//like a video
router.put("/like/:videoId",verifyToken, like)


// dislike a video
router.put("/dislike/:videoId",verifyToken, dislike)


export default router