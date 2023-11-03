import JWT from "jsonwebtoken";
import userModel from "../model/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_TOKEN
    );
    req.user = decode;
    console.log(decode);
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id });
    if (user.role !== 1) {
      res.send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
