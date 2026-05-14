const express = require("express");
const router = express.Router();

const{
    createIdea,getAllIdeas,getMyIdeas,updateIdea,deleteIdea,reviewIdea}=require("../controllers/ideaController");

const authMiddleware=require("../middleware/authMiddleware");
const rolemiddleware=require("../middleware/roleMiddleware");

//User routes
//Create Idea
router.post("/",authMiddleware,createIdea);

//get My Ideas
router.get("/my",authMiddleware,getMyIdeas);

//update Idea
router.put("/:id",authMiddleware,updateIdea);

//deleteIdea
router.delete("/:id",authMiddleware,deleteIdea);

//Admin 
//Get All ideas
router.get("/", authMiddleware, getAllIdeas);

//Review Idea
router.put("/:id/review",authMiddleware,rolemiddleware(["admin","evaluator"]),reviewIdea);

module.exports=router;