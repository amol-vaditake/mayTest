var express = require("express");
var router = express.Router();
var authenticate = require("../middlewares/authenticate");
var companyController = require("../controllers/companyController");


router.get("/companys", companyController.getCompany);
router.get("/companyPofile/some/:id", companyController.companyProfile);

module.exports = router;