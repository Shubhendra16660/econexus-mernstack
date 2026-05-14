const Idea = require("../models/Idea");
// CREATE IDEA
exports.createIdea = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { title, description, category } = req.body;

    const idea = await Idea.create({
      title,
      description,
      category,
      submittedBy: req.user.id,
    });

    console.log("IDEA CREATED:", idea);

    res.status(201).json({
      success: true,
      idea,
    });

  } catch (error) {

    console.log("FULL ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL IDEAS (with pagination)
exports.getAllIdeas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filter = {};

if (req.query.status) {
  filter.status = req.query.status;
}

const ideas = await Idea.find(filter)
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    if (!ideas.length) {
      return res.status(404).json({ message: "No ideas found" });
    }

    res.status(200).json({
      success: true,
      page,
      count: ideas.length,
      data: ideas,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// GET MY IDEAS
exports.getMyIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ submittedBy: req.user.id })
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 });

    if (!ideas.length) {
      return res.status(404).json({ message: "No ideas found" });
    }

    res.status(200).json({
      success: true,
      count: ideas.length,
      data: ideas,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// UPDATE IDEA
exports.updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    // Only owner can update
    if (idea.submittedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Idea updated successfully",
      data: updatedIdea,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// DELETE IDEA
exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    if (idea.submittedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await idea.deleteOne();

    res.status(200).json({
      success: true,
      message: "Idea deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//reviewIdea
exports.reviewIdea = async (req, res) => {
  try {
    const { status, feedback, score } = req.body;

    if (!status || !feedback || !score) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    idea.status = status;
    idea.feedback = feedback;
    idea.score = score;

    await idea.save();

    res.status(200).json({
      success: true,
      message: "Idea reviewed successfully",
      data: idea,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

