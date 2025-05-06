let userModel=require('../models/user-model');
let bcrypt=require('bcrypt');
let jwt= require('jsonwebtoken');
let { generateToken } = require('../utils/generateToken');
const { verifyToken } = require('../middlewares/authMiddleware');


module.exports.registerUser = async function(req, res) {
    try {
        let { name, email, role, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and password are required'
            });
        }

        // Check if user exists
        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({  // 409 Conflict is more appropriate
                success: false,
                message: 'Email already registered. Please login.'
            });
        }

        // Hash password using async/await
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        let user = await userModel.create({
            name,
            email,
            role: role || 'user', // Default to 'user' if not specified
            password: hashedPassword
        });

        // Generate token
        let token = generateToken(user);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });      
        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error during registration'
        });
    }
};

module.exports.loginUser = async function(req, res) {
  try {
    let { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials' // Generic message for security
      });
    }

    // Compare passwords using async/await
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials' // Same message as above
      });
    }

    // Generate token
    let token = generateToken(user);
    
    // Set secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // ✅ Send token explicitly in response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token, // ✅ Ensure frontend can store it
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login'
    });
  }
};
//logout user 
module.exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(0),
      path: "/",
    });

    // ✅ Send JSON response
    res.status(200).json({ success: true, message: "Logged out successfully!" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Logout failed. Please try again." });
  }
};
/// returning user 
module.exports.getUserDetails = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }


    // ✅ Ensure role exists, fallback to "guest"
    const userRole = req.user.role || "user";

    // ✅ Send success response with user details
    res.status(200).json({
      success: true,
      user: req.user,
      role: userRole, 
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};