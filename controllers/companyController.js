let Company = require("../models/company")
let History = require("../models/history")

module.exports = {
    renderCompanyPage: function (req, res) {
        res.render("addCompany", {
            title: "Add Company page"
        });
    },
    addCompany: function (req, res) {
        let company = new Company({
            ...req.body
        });
        company
            .save()
            .then(function (company) {
                res.redirect("/companys");
            })
            .catch(function (err) {
                console.log(err);
                if (err.name === "ValidationError")
                    return res.status(400).send(`Validation Error: ${err.message}`);
            });
    },
    getCompany: function (req, res) {

        Company.find({})
            .then(function (companys) {
                return res.render("companys", {
                    companys: companys,
                    length: companys.length

                });
            })
            .catch(function (err) {
                console.log(err.message);
                return res.status(500).send("Server error");
            });
    },

    joinCompany: async (req, res) => {
        let history = new History({
            companyId: req.params.id,
            companyName: req.params.name,
            empName: req.employee.name,
            employId: req.employee.id,
            joinedAt: new Date()
        });
        id = req.employee.id
        const cur_company = await History.find({
            employId: id,
            leavedAt: "None"
        });
        if (cur_company.length == 1) {
            res.redirect("/profile")
        } else {
            await history.save()
            res.redirect("/companys")
        }
    },
    leaveCompany: async (req, res) => {
        const data = await History.findOne({
            employId: req.employee.id,
            leavedAt: "None"
        })
        await data.updateOne({
            leavedAt: new Date()
        })
        res.redirect("/profile")
    },
    companyProfile: async (req, res) => {
        const id = req.params.id
        const data = await History.find({
            companyId: id,
            leavedAt: "None"
        })
        const data1 = await History.find({
            companyId: id
        })
        res.render("companyProfile", {
            data,
            data1,
            len: data.length
        });
    },
}