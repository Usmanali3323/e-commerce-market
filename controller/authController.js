import { comparePassword, hashPassword } from "./../helper/authHelper.js";
import userModel from "../model/userModel.js";
import ProductModel from "../model/ProductModel.js";
import OrderModel from "../model/orderModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, role, address, answer } = req.body;
    if (!name) {
      return res.send("Name is required ");
    } else if (!email) {
      return res.send("email is required");
    } else if (!password) {
      return res.send("password is required");
    } else if (!phone) {
      return res.send("phone is required");
    } else if (!address) {
      return res.send("address is required");
    } else if (!answer) {
      return res.send("answer is required");
    }

    //existing User
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "Already Register Please login ",
      });
    }

    //Hash Password
    const hashedPassword = await hashPassword(password);

    try {
      const user = new userModel({
        name,
        email,
        password: hashedPassword,
        address,
        role,
        phone,
        answer,
      });
      await user.save();

      res.status(201).send({
        success: true,
        message: "Register user successfully",
        user,
      });
    } catch (error) {
      console.log("Error occuring in Register user in Database", error);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      err,
    });
  }
};

//Login User
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        success: false,
        message: "Invalid Email || password",
      });
    }

    //check Email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not Exist",
      });
    }

    //check Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully ",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error inn Login ",
      error: error.message,
    });
  }
};

//testController
export const testController = (req, res) => {
  res.send({ test: "testController" });
};

//Update Password
export const updateController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is Required" });
    } else if (!answer) {
      res.status(400).send({ message: "answer is Required" });
    } else if (!newPassword) {
      res.status(400).send({ message: " new Password is Reequired" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not Found",
      });
    }

    const newhashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {
      password: newhashedPassword,
    });
    res.status(200).send({
      success: true,
      message: "Password successfullly updated",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something wrong",
      error,
    });
  }
};

//Update User Profile
export const UpdateProfileController = async (req, res) => {
  try {
    const { email, password, address, phone, name, _id } = req.body;
    console.log(email, password, address, phone, name, _id);
    const pswd = password ? await hashPassword(password) : undefined;
    const user = await userModel.findByIdAndUpdate(
      { _id: _id },
      {
        password: password || pswd,
        address: address || address,
        phone: phone || phone,
        name: name || name,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Successfully Updated Profile",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Updating User Profile",
      error: error.message,
    });
  }
};

//user Order
export const userOrderController = async (req, res) => {
  try {
    const orders = await OrderModel.find({ buyer: req.user.id })
      .populate("products", "-photo")
      .populate("buyer")
      .sort({ createdAt: "-1" });
    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in User Order" + error.message,
      error,
    });
  }
};

//get all Admin order
export const getAdminOrderCountroller = async (req, res) => {
  try {
    const order = await OrderModel.find({})
      .populate("products", "-photo")
      .populate("buyer")
      .sort({ createdAt: "-1" });
    res.status(200).send({
      success: true,
      message: "successfully got order from admin order",
      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in Admin order",
      error,
    });
  }
};

export const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await OrderModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    res.status(200).send({
      succes: true,
      message: "update status successfully of order in admin menu",
      order,
    });
  } catch (error) {
    res.status(500).send({
      succes: false,
      message: "Error in updating status of order in Admin menu",
      error,
    });
  }
};

//delete order in admin menu
export const orderDleteController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const order = await OrderModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Successfullly deleted order in admin menu",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Deleting order in admin menu " + error.message,
      error,
    });
  }
};
