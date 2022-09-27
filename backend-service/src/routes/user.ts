import { userModel, userInterface_b } from '../model/userModel'

export const upsertUser = async (req, res) => {
  try {
    const { id, name, dob, email, profile, password, salary, active, joiningDate, position, age, department } = req.body
    let user: userInterface_b;
    if (id) {
      user = await userModel.findOne({ _id: id })
    }
    else {
      user = new userModel()
      user.is_delete = false
    }
    if (name != undefined) user.name = name
    if (dob != undefined) user.dob = dob
    if (email != undefined) user.email = email
    if (profile != undefined) user.profile = profile
    if (password != undefined) user.password = password
    if (salary != undefined) user.salary = salary
    if (active != undefined) user.active = active
    if (joiningDate != undefined) user.joiningDate = joiningDate
    if (position != undefined) user.position = position
    if (age != undefined) user.age = age
    if (department != undefined) user.department = department
    await user.save()
    return res.status(200).send(user);
  } catch (ex) {
    return res.status(500).send(ex);
  }
}
export const getUserList = async (req, res) => {
  try {
    const userList: userInterface_b[] = await userModel.find({
      is_delete: false,
    }).sort({ joiningDate: -1 });
    console.log("userList", userList)
    return res.status(200).send(userList);
  } catch (err) {
    return res.status(500).send(err);
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.body
    const userList: userInterface_b[] = await userModel.findOne({
      _id: id,
      is_delete: false,
    });
    console.log("userList", userList)
    return res.status(200).send(userList);
  } catch (err) {
    return res.status(500).send(err);
  }
};
export const getDeleteById = async (req, res) => {
  try {
    const { id } = req.body
    const user: userInterface_b = await userModel.findOne({
      _id: id,
      is_delete: false,
    });
    if (!user) { return res.status(500).send({ msg: "user with this id does not exist" }); }
    user.is_delete = true
    user.save()
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};
export const getMinSalaryByDepartment = async (req, res) => {
  try {
    const { id } = req.body
    const department: userInterface_b[] = await userModel.find({ "department._id": id }).sort({ salary: 1 }).limit(1)
    return res.status(200).send(department);
  } catch (err) {
    return res.status(500).send(err);
  }
};
export const getSearchedUser = async (req, res) => {
  try {
    const { searchString } = req.body
    const user: userInterface_b[] = await userModel.find({
      '$or': [
        { 'name': { '$regex': searchString, '$options': 'i' } },
        { 'email': { '$regex': searchString, '$options': 'i' } },
        { 'department.name': { '$regex': searchString, '$options': 'i' } },
      ]
    }).sort({ joiningDate: -1 });
    console.log("users", user)
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};
export const getuserCountByDepartment = async (req, res) => {
  try {
    const { id } = req.body
    const count = await userModel.find({ "department._id": id }).count()
    return res.status(200).json(count);
  } catch (err) {
    return res.status(500).send(err);
  }
};