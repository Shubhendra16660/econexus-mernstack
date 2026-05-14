const mongoose = require("mongoose");

const ideaSchema= new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type : String,
            required: true
        },
        status:{
         type: String,
         enum : ["pending","approved","rejected"],
         default: "pending"
        },
        submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        feedback: {
           type: String,
           default: ""
        },
        score: {
            type: Number,
            default: 0,
        },
    },
    {
    timestamps: true, // createdAt, updatedAt auto add karega
  }
);
module.exports=mongoose.model("Idea",ideaSchema);