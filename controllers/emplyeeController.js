let Employee = require("../models/employee")
let History = require("../models/history")
module.exports = {
    renderRegisterPage: function (req, res) {
        res.render("register", {
            title: "Register page"
        });
    },

    renderLoginPage: function (req, res) {
        res.render("login", {
            title: "Login page"
        });
    },

    registeremployee: function (req, res) {
        let employee = new Employee({
            ...req.body
        });
        employee
            .save()
            .then(function (employee) {
                res.redirect("/login");
            })
            .catch(function (err) {
                console.log(err);
                if (err.name === "ValidationError")
                    return res.status(400).send(`Validation Error: ${err.message}`);
            });
    },

    loginemployee: function (req, res) {
        // Get the employees json file
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password)
            return res.status(400).send("Incorrect credentials");
        Employee.findByEmailAndPassword(email, password)
            .then(function (employee) {
                req.session.employeeId = employee._id;
                res.redirect("/profile");
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect("/login");
            });
    },


    logOutemployee: function (req, res) {
        req.session.destroy();
        return res.redirect("/login");
    },


    profile: async (req, res) => {
        id = req.employee.id
        const cur_company = await History.find({
            employId: id,
            leavedAt: "None"
        });
        const history = await History.find({
            employId: id
        }).sort({
            updatedAt: 1
        });
        const info = await Employee.find({
            _id: id
        });
        res.render("profile", {
            cur_company,
            history,
            info,
            len: cur_company.length
        });
    }
};