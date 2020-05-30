employee = require("../models/employee")
module.exports = function (req, res, next) {
  if (req.session.employeeId) {
    employee.findById(req.session.employeeId).then(function (employee) {
        req.employee = employee;
        next()
      })
      .catch(function (err) {
        console.log(err.massage);
        res.redirect("/login")
      })
    // Grabbing the employee.
  } else res.redirect("/login");
};