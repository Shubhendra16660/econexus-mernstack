const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.registerUser = async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    console.log(name,email,password);

    //check user already exists
    const userExists= await User.findOne({email});
    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }
  
   
    //create user
    const user=await User.create({
        name,
        email,
        password,
    });
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
    }
    catch (error) {
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};

exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // ✅ clean email
    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ use schema method
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};