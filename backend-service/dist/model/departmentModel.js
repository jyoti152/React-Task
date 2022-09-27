"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentModel = exports.departmentSchema = void 0;
const mongoose_1 = require("mongoose");
;
;
exports.departmentSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    is_delete: { type: Boolean, required: false },
    maxEmployee: { type: Number, required: false },
    maxSalary: { type: Number, required: false },
});
exports.departmentModel = (0, mongoose_1.model)("department", exports.departmentSchema);
//# sourceMappingURL=departmentModel.js.map