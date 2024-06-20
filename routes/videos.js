import express  from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../VerifyToken.js";

const router = express.Router();
//Create a video
router.post("/", verifyToken, addVideo);

//Update video
router.put("/:id", verifyToken, updateVideo);

//Delete a video
router.delete("/:id", verifyToken, deleteVideo);

// Get a Video
router.get("/find/:id", getVideo);

router.put("/views/:id", addView);

router.get("/trend", trend);
router.get("/random", random);

router.get("/sub",verifyToken, sub);
router.get("/tags", getByTag);
router.get("/search", search);




export default router