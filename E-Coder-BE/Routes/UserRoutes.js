import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";
import CourseModel from "../Models/CourseModel.js";
import nodemailer from "nodemailer";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.password == password);
    if (user && user.password == password) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  // admin,
  asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin=false } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(500);
      throw new Error("User already exists");
    }else{
      const user = await User.create({
        name,
        email,
        password,
        isAdmin: isAdmin,
        avatar: 'https://steamuserimages-a.akamaihd.net/ugc/956340656734710422/BDD60EF2C1699E1C8AAEA6E2E43BD643DAE49CCC/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
      });
  
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(200);
        throw new Error("Invalid User Data");
      }
    }
  })
);

userRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const Users = await User.findById(req.params.id);
    if (Users) {
      await Users.remove();
      res.json({ message: "Users deleted" });
    } else {
      res.status(404);
      throw new Error("Users not Found");
    }
  })
);

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id);

    if (user) {

      console.log(req.body);

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      user.avatar = req.body.avatar || user.avatar;
    
      const updatedUser = await user.save();
      res.json({
        ...updatedUser
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

userRouter.post("/forgot-password", asyncHandler(async (req, res) => {
  const email = req.body.email
  const users = await User.find({ email: email });
  
  if (users) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'ok@gmail.com',
          pass: 'dazkhrjgiznjxfvp'
      }
    });
    
    let mailOptions = {
      from: 'Shop Phone',
      to: users[0].email,
      subject: 'Change Password',
      text: `http://localhost:3000/rest-pass/${users[0]._id}`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
        res.status(200).json("success");
      }
  });
    
  } else {
    return res.status(400).json("error");
  }
}))

userRouter.put("/change-password", asyncHandler(async (req, res) => {
  const { id, password } = req.body;

  const us = await User.findById(id);
  if (us) {
    us.password = password || us.password;

    const updatedProduct = await us.save();
    res.status(200).json(updatedProduct);
  }

 }))

 userRouter.get(
  "/user/:id",
  asyncHandler(async (req, res) => {
    const users = await User.findOne({ _id: req.params.id });
    res.json(users);
  })
);

userRouter.get(
  "/userEmail/:email",
  asyncHandler(async (req, res) => {
    const users = await User.findOne({ email: req.params.email });
    res.json(users._id);
  })
);

 userRouter.get(
  "/info/:id/:idCourse",
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.id });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const course = await CourseModel.findOne({ _id: req.params.idCourse });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      const isExists = course.listUsers.some((item) => item.user.toString() === user._id.toString());

      return res.json(isExists);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  })
);
 

export default userRouter;
