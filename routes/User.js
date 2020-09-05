/**
 * @author Mayank Bagla, Ram prasath Meganathan( B00851418)
 */

//API Routes

const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");
const Feedback = require("../models/feedback")
const Product = require("../models/userModel");
const e = require("express");
const mongoose = require("mongoose");
const _ =require('lodash');
const nodemailer = require('nodemailer'); 

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "Mayank",
      sub: userID,
    },
    "Mayank",
    { expiresIn: "1h" }
  );
};

let mailTransporter = nodemailer.createTransport({ 
  service: 'gmail', 
  auth: { 
      user: 'mayyank.cooldude@gmail.com', 
      pass: ''
  } 
}); 

userRouter.post("/register", (req, res) => {
  const { username, password, firstname, lastname, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has in findone occured", msgError: true },
      });
    if (user)
      res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
    else {
      const newUser = new User({
        username,
        password,
        firstname,
        lastname,
        role,
      });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Error has occured in saving",
              msgError: true,
            },
          });
        else
          res
            .status(200)
            .json({ message: { msgBody: "Account created", msgError: false } });
      });
    }
  });
});


userRouter.put('/reset',(req,res)=>{
  const {resetLink,newPass}=req.body;
  if(resetLink){
      JWT.verify(resetLink, "Mayank", function(error, decodeData){
          if(error){
              return res.status(401).json({message : {msgBody : "Incorrect token or token expired.", msgError: true}});
          }
          else{
              User.findOne({resetLink},(err, user)=>{
                  if(err || !user){
                      return res.status(400).json({message : {msgBody : "User with this token does not exist", msgError: true}});
                  }
                  const obj = {
                      password: newPass,
                      resetLink:''
                  }
                  user = _.extend(user,obj);
                  user.save((err,result)=>{
                      if(err){
                          res.status(400).json({message : {msgBody : "Reset password error", msgError: true}});
                      } else{
                          return res.status(200).json({message:{msgBody : "Your password has been changed", msgError: false}})
                      }
                  })
              })
          }
      })
  } else{
      res.status(401).json({message : {msgBody : "Authentication Error", msgError: true}});
  }
});


userRouter.put('/forgot',(req,res)=>{
  const {username}=req.body;
  User.findOne({username},(err,user)=>{
      if(err)
          res.status(500).json({message : {msgBody : "Error occured in DB occured", msgError: true}});
      if(!user)
          res.status(400).json({message : {msgBody : "Username does not exists", msgError: true}});
      else{  
          const token = JWT.sign({_id: username._id},"Mayank",{expiresIn: "1h"})
          // const data = {
          //     from: 'noreply@communitycare.com',
          //     to: username,
          //     subject: 'Reset Password',
          //     html: `<h2> Click on the link below to reset your password.</h2>
          //     <a> http://localhost:3000/resetlink/${token} </a>`
          // };

          let mailDetails = { 
              from: 'mayyank.cooldude@gmail.com', 
              to: username, 
              subject: 'Reset Password', 
              html: `<h2> Click on the link below to reset your password.</h2>
              Click <a href=" https://communitycare-app.herokuapp.com/resetlink/${token}"> here</a> to reset your password`
          };

          return user.updateOne({resetLink:token}, function(err, success){
              if(err){
                  res.status(400).json({message : {msgBody : "Reset password link error", msgError: true}});
              } else{
                  mailTransporter.sendMail(mailDetails,function(error, body){
                      if(error){
                          return res.json({
                              error: err.message
                          })
                      }
                      return res.json({message:{msgBody : "Email has been sent. Please check you Email.", msgError: false}})
                  })

                  // mailTransporter.sendMail(mailDetails, function(err, data) { 
                  //     if(err) { 
                  //         console.log('Error Occurs'); 
                  //     } else { 
                  //         console.log('Email sent successfully'); 
                  //     } 
                  // }); 
              }
          })
      }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.todos.push(todo);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: { msgBody: "successfully addedd", msgError: false },
            });
        });
      }
    });
  }
);

userRouter.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("todos")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res.status(200).json({ todos: document.todos, authenticated: true });
        }
      });
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "Admin logged in", msgError: false } });
    } else
      res.status(403).json({
        message: { msgBody: "you're not an admin, go away", msgError: true },
      });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

userRouter.get("/username/:email", (req, res, next) => {
  const id = req.params.email;
  Product.find({ email: id })
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

userRouter.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

userRouter.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    zip: req.body.zip,
    phone: req.body.phone,
    quantity: req.body.quantity,
    itemtype: req.body.itemtype,
    date: new Date(),
    active: true,
    donorhistory:
      monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
  });
  console.log(req.body);
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

userRouter.get("/itemtype/:item", (req, res, next) => {
  const id = req.params.item;
  Product.find({ itemtype: id })
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

userRouter.get("/reqemail/:email", (req, res, next) => {
  const email = req.params.email;
  Product.find({ reqemail: email })
    .exec()
    .then((data) => {
      console.log(data);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "User does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

userRouter.post("/addfeedback", (req, res) => {
  if (req.body) {

    const userFeedback = new Feedback({
      _id: new mongoose.Types.ObjectId(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      comments: req.body.comments
    });

    userFeedback.save();
    responseMessage =
      res.status(200).send({ message: { msgBody: "Feedback Sent successfully", msgError: false } });
  }
  else {
    res.status(407).json({
      success: false,
      message: "error occured",
    });
  }
})

userRouter.get("/feedback", (req, res) => {
  Feedback
    .find()
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = userRouter;
