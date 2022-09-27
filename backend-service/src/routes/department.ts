import { departmentModel, departmentInterface_b } from '../model/departmentModel'

export const upsertDepartment = async (req, res) => {
    try {
        const { id, name, maxEmployee, maxSalary } = req.body
        let department: departmentInterface_b;
        if (id) {
            department = await departmentModel.findOne({ _id: id })
        }
        else {
            department = new departmentModel()
            department.is_delete = false
        }
        if (name != undefined) department.name = name
        if (maxEmployee != undefined) department.maxEmployee = maxEmployee
        if (maxSalary != undefined) department.maxSalary = maxSalary
        await department.save()
        return res.status(200).send(department);
    } catch (ex) {
        return res.status(500).send(ex);
    }
}
export const getDepartmentList = async (req, res) => {
    try {
        const departmentList: departmentInterface_b[] = await departmentModel.find({
            is_delete: false,
        });
        return res.status(200).send(departmentList);
    } catch (err) {
        return res.status(500).send(err);
    }
};
export const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.body
        const department: departmentInterface_b[] = await departmentModel.findOne({
            _id: id,
            is_delete: false,
        });
        return res.status(200).send(department);
    } catch (err) {
        return res.status(500).send(err);
    }
};
export const getDeleteById = async (req, res) => {
    try {
        const { id } = req.body
        const department: departmentInterface_b = await departmentModel.findOne({
            _id: id,
            is_delete: false,
        });
        if (!department) { return res.status(500).send({ msg: "department with this id does not exist" }); }
        department.is_delete = true
        department.save()
        return res.status(200).send(department);
    } catch (err) {
        return res.status(500).send(err);
    }
};
