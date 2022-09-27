"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
;
;
exports.userSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    is_delete: { type: Boolean, required: false },
    dob: { type: Date, required: false },
    email: { type: String, required: false },
    profile: { type: String, required: false },
    password: { type: String, required: false },
    salary: { type: Number, required: false },
    active: { type: Boolean, required: false },
    joiningDate: { type: Date, required: false },
    position: { type: String, required: false },
    age: { type: Number, required: false },
    department: { _id: String, name: String, maxEmployee: Number, maxSalary: Number }
});
exports.userModel = (0, mongoose_1.model)("user", exports.userSchema);
//# sourceMappingURL=userModel.js.map