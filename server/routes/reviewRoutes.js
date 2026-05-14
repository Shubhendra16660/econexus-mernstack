const express=require("express");
const router=express.Router();

const {reviewIdea}=require("../controllers/ideaController");

const authMiddleware =require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");

//review Idea(admin/ evaluator only)
router.put("/:id",authMiddleware,roleMiddleware(["admin", "evaluator"]),
  reviewIdea
);
module.exports = router;