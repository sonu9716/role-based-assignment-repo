const jwt=require('jsonwebtoken');

const generateToken=(user)=>{
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, // ✅ Ensure role is included
        process.env.JWT_KEY,
        { expiresIn: "1d" }
    );
}

module.exports.generateToken=generateToken;