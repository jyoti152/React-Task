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
exports.getDeleteById = exports.getDepartmentById = exports.getDepartmentList = exports.upsertDepartment = void 0;
const departmentModel_1 = require("../model/departmentModel");
const upsertDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("req.", req.body);
        const { id, name, maxEmployee, maxSalary } = req.body;
        let department;
        if (id) {
            department = yield departmentModel_1.departmentModel.findOne({ _id: id });
        }
        else {
            department = new departmentModel_1.departmentModel();
            department.is_delete = false;
        }
        if (name != undefined)
            department.name = name;
        if (maxEmployee != undefined)
            department.maxEmployee = maxEmployee;
        if (maxSalary != undefined)
            department.maxSalary = maxSalary;
        yield department.save();
        return res.status(200).send(department);
    }
    catch (ex) {
        return res.status(500).send(ex);
    }
});
exports.upsertDepartment = upsertDepartment;
const getDepartmentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentList = yield departmentModel_1.departmentModel.find({
            is_delete: false,
        });
        console.log("departmentList", departmentList);
        return res.status(200).send(departmentList);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getDepartmentList = getDepartmentList;
const getDepartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const department = yield departmentModel_1.departmentModel.findOne({
            _id: id,
            is_delete: false,
        });
        console.log("department", department);
        return res.status(200).send(department);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getDepartmentById = getDepartmentById;
const getDeleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const department = yield departmentModel_1.departmentModel.findOne({
            _id: id,
            is_delete: false,
        });
        if (!department) {
            return res.status(500).send({ msg: "department with this id does not exist" });
        }
        department.is_delete = true;
        department.save();
        return res.status(200).send(department);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.getDeleteById = getDeleteById;
//# sourceMappingURL=department.js.map