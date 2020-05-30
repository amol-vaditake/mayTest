var express = require("express");
var router = express.Router();
var authenticate = require("../middlewares/authenticate");
var emplyeeController = require("../controllers/emplyeeController");
var companyController = require("../controllers/companyController");

// Register page
router.get("/register", emplyeeController.renderRegisterPage);

// Login page
router.get("/login", emplyeeController.renderLoginPage);


router.post("/register", emplyeeController.registeremployee);

router.post("/login", emplyeeController.loginemployee);

router.post("/logout", authenticate, emplyeeController.logOutemployee);

router.post("/join/:id/:name", authenticate, companyController.joinCompany);

router.post("/leave", authenticate, companyController.leaveCompany);

router.get("/profile", authenticate, emplyeeController.profile)

router.post("/addCompany", authenticate, companyController.addCompany);

router.get("/addCompany", authenticate, companyController.renderCompanyPage);

module.exports = router;