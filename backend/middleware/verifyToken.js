import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

   try {
       const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

       if (!decodedToken) {
           return res.status(401).json({ message: "Unauthorized - Invalid token" });
       }

       req.userId = decodedToken.userId;
       next();
   } catch (error) {
       console.log("Error in verify token", error);
       res.status(500).json({ message: error.message });
   }
};