"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getuserCountByDepartment = exports.getSearchedUser = exports.getMinSalaryByDepartment = exports.getDeleteById = exports.getUserById = exports.getUserList = exports.upsertUser = void 0;
const userModel_1 = require("../model/userModel");
const upsertUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, dob, email, profile, password, salary, active, joiningDate, position, age, department } = req.body;
        let user;
        if (id) {
            user = yield userModel_1.userModel.findOne({ _id: id });
        }
        else {
            user = new userModel_1.userModel();
            user.is_delete = false;
        }
        if (name != undefined)
            user.name = name;
        if (dob != undefined)
            user.dob = dob;
        if (email != undefined)
            user.email = email;
        if (profile != undefined)
            user.profile = profile;
        if (password != undefined)
            user.password = password;
        if (salary != undefined)
            user.salary = salary;
        if (active != undefined)
            user.active = active;
        if (joiningDate != undefined)
            user.joiningDate = joiningDate;
        if (position != undefined)
            user.position = position;
        if (age != undefined)
            user.age = age;
        if (department != undefined)
            user.department = department;
        yield user.save();
        return res.status(200).send(user);
    }
    catch (ex) {
        return res.status(500).send(ex);
    }
});
exports.upsertUser = upsertUser;
const getUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield userModel_1.userModel.find({
            is_delete: false,
        }).sort({ joiningDate: -1 });
        console.log("userList", userList);
        return res.status(200).send(userList);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getUserList = getUserList;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const userList = yield userModel_1.userModel.findOne({
            _id: id,
            is_delete: false,
        });
        console.log("userList", userList);
        return res.status(200).send(userList);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getUserById = getUserById;
const getDeleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const user = yield userModel_1.userModel.findOne({
            _id: id,
            is_delete: false,
        });
        if (!user) {
            return res.status(500).send({ msg: "user with this id does not exist" });
        }
        user.is_delete = true;
        user.save();
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getDeleteById = getDeleteById;
const getMinSalaryByDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const department = yield userModel_1.userModel.find({ "department._id": id }).sort({ salary: 1 }).limit(1);
        return res.status(200).send(department);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getMinSalaryByDepartment = getMinSalaryByDepartment;
const getSearchedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchString } = req.body;
        const user = yield userModel_1.userModel.find({
            '$or': [
                { 'name': { '$regex': searchString, '$options': 'i' } },
                { 'email': { '$regex': searchString, '$options': 'i' } },
                { 'department.name': { '$regex': searchString, '$options': 'i' } },
            ]
        }).sort({ joiningDate: -1 });
        console.log("users", user);
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getSearchedUser = getSearchedUser;
const getuserCountByDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const count = yield userModel_1.userModel.find({ "department._id": id }).count();
        return res.status(200).json(count);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getuserCountByDepartment = getuserCountByDepartment;
//# sourceMappingURL=user.js.map