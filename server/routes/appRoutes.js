const express = require("express");
const router = express.Router();
const appControllers = require("../controllers/appControllers");

router.get("/", appControllers.homepage);
router.get("/studentLogin", appControllers.studentLoginPage);
router.get("/studentRegister", appControllers.studentRegisterPage);
router.get("/parentLogin", appControllers.parentLoginPage);
router.get("/parentRegister", appControllers.parentRegisterPage);
router.get("/profile", appControllers.profilePage);
router.get("/editProfile", appControllers.editProfilePage);
router.get("/test", appControllers.testPage);
router.get("/test/psycho", appControllers.psychoPage);
router.get("/test/aptitude", appControllers.aptitudePage);
router.get("/test/interest", appControllers.interestPage);
router.get("/test/hobbies", appControllers.hobbiesPage);
router.get("/test/result", appControllers.resultPage);
router.get("/feedback", appControllers.feedbackPage);

router.post("/studentRegister", appControllers.studentRegisterAPI);
router.post("/studentLogin", appControllers.studentLoginAPI);
router.post("/editProfile", appControllers.editProfileAPI);
router.post("/parentRegister", appControllers.parentRegisterAPI);
router.post("/parentLogin", appControllers.parentLoginAPI);
router.post("/test/result", appControllers.resultAPI);
router.post("/feedback", appControllers.feedbackAPI);

module.exports = router;
