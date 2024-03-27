import jwt from "jsonwebtoken";

export const checkAuth = {
  verifyUser: (req, res, next) => {
    const token = req.cookies["auth-token"];
    if (!token) {
      return res.status(400).send({ error: "Please login" });
    }
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
      } catch (error) {
        return res.status(401).send({ error: "Invalid Token" });
      }
    }
  },
};
