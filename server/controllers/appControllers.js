require("../models/database");
const { request } = require("express");
const Register = require("../models/register");
const Profile = require("../models/profile");
const path = require("path");
const Parent = require("../models/parent");
const Feedback = require("../models/feedback");
const { log } = require("console");

exports.homepage = async (req, res) => {
  res.render("index");
};

exports.studentLoginPage = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("studentLogin", { infoErrorsObj, infoSubmitObj });
};

exports.studentRegisterPage = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("studentRegister", { infoErrorsObj, infoSubmitObj });
};

exports.parentLoginPage = async (req, res) => {
  res.render("parentLogin");
};

exports.parentRegisterPage = async (req, res) => {
  res.render("parentRegister");
};

exports.profilePage = async (req, res) => {
  res.render("profile");
};

exports.editProfilePage = async (req, res) => {
  res.render("editProfile");
};

exports.testPage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/test.html");
  res.sendFile(htmlFilePath);
};

exports.psychoPage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/psycho.html");
  res.sendFile(htmlFilePath);
};

exports.aptitudePage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/aptitude.html");
  res.sendFile(htmlFilePath);
};

exports.interestPage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/interest.html");
  res.sendFile(htmlFilePath);
};
exports.hobbiesPage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/hobbies.html");
  res.sendFile(htmlFilePath);
};

exports.resultPage = async (req, res) => {
  const htmlFilePath = path.join(__dirname, "../../public/test/result.html");
  res.sendFile(htmlFilePath);
};

exports.feedbackPage = async (req, res) => {
  res.render("feedback.ejs");
};

exports.studentRegisterAPI = async (req, res) => {
  try {
    const registerUser = new Register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const registerd = await registerUser.save();
    req.flash("infoSubmit", "Registration Successfull");
    res.status(200).redirect("studentLogin");
  } catch (error) {
    req.flash("infoErrors", `error:${error}`);
    res.status(400).redirect("studentRegister");
  }
};

exports.studentLoginAPI = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email: email });

    if (userEmail.password === password) {
      res.status(200).render("");
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (error) {
    res.status(400).send("Invalid Details");
  }
};

exports.editProfileAPI = async (req, res) => {
  try {
    const createProfile = new Profile({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      educationBoard: req.body.educationBoard,
      parentEmail: req.body.parentEmail,
      parentNumber: req.body.parentNumber,
      familyIncome: req.body.familyIncome,
      address: req.body.address,
    });

    const createdProfile = await createProfile.save();
    req.flash("infoSubmit", "Profile Created Successfully");
    res.status(200).redirect("profile");
  } catch (error) {
    req.flash("infoErrors", `error:${error}`);
    res.status(400).redirect("editProfile");
  }
};

exports.parentRegisterAPI = async (req, res) => {
  const studentEmail = req.body.studentEmail;
  const studentPassword = req.body.studentPassword;

  try {
    const studentExists = await Register.findOne({
      email: studentEmail,
      password: studentPassword,
    });

    if (studentExists) {
      const parentExists = await Parent.findOne({
        email: req.body.parentEmail,
      });

      if (!parentExists) {
        const registerParent = new Parent({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.parentEmail,
          studentEmail: studentEmail,
          studentPassword: studentPassword,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
        });

        const registerdParentInfo = await registerParent.save();
        req.flash("infoSubmit", "Profile Created Successfully");
        res.status(200).redirect("/");
      } else {
        // req.flash("infoErrors", "Parent with this email already exists");
        res.status(400).redirect("/parentRegister");
      }
    } else {
      // req.flash("infoErrors", "Invalid Student Email or Password");
      res.status(400).redirect("/parentRegister");
    }
  } catch (error) {
    req.flash("infoErrors", `Error: ${error.message}`);
    res.status(400).redirect("/parentRegister");
  }
};

exports.parentLoginAPI = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const parentEmail = await Parent.findOne({ email: email });

    if (parentEmail && parentEmail.password === password) {
      res.status(200).render("profile");
    } else {
      res.status(400).send("Invalid Password");
    }
  } catch (error) {
    res.status(400).send("Invalid Details");
  }
};

exports.resultAPI = async (req, res) => {
  try {
    // Assume the user identifier (e.g., email) is sent along with the reports data in the request body
    const { userIdentifier, reportsData } = req.body;

    // Fetch the existing user from the database based on the identifier
    const existingUser = await Register.findOne({ email: userIdentifier });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Inside api result");

    // Create a new report linked to the existing user
    const newReports = new ReportsModel({
      user: existingUser._id,
      ...reportsData,
    });
    await newReports.save();

    res.status(200).json({ message: "Reports saved successfully" });
  } catch (error) {
    console.error("Error saving reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.feedbackAPI = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    // Create a new feedback instance
    const newFeedback = new Feedback({
      name,
      email,
      feedback,
    });

    // Save to MongoDB
    await newFeedback.save();

    res.redirect("Feedback");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
