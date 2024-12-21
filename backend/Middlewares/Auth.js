
// const jwt = require('jsonwebtoken');
// const ensureAuthenticated = (req, res, next) => {
//     const auth = req.headers['authorization'];
//     if (!auth) {
//         return res.status(403)
//             .json({ message: 'Unauthorized, JWT token is require' });
//     }
//     try {
//         const decoded = jwt.verify(auth, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(403)
//             .json({ message: 'Unauthorized, JWT token wrong or expired' });
//     }
// }

// module.exports = ensureAuthenticated;














const jwt = require('jsonwebtoken');
const User = require("../Models/User");

const ensureAuthenticated = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided" });
    }

    // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
    const jwtToken = token.replace("Bearer", "").trim();
    console.log(jwtToken);

    try {
        // Verifying the token
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        console.log(isVerified);

        // getting the complete user details & also we don't want password to be sent
        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });

        req.token = token;
        req.user = userData;
        req.userID = userData._id;

        // Move on to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
}


module.exports = ensureAuthenticated;






















