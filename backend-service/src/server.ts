import * as bodyParser from "body-parser";
import * as cors from "cors";

const express = require('express')
const PORT = 8620

const mongoose = require("mongoose");

let uri = "mongodb://localhost:27017"
// const uri = "mongodb+srv://jyoti:jyoti@cluster0.j9tc329.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri).then(() => {
    console.log("Mongodb connected successfully")
}).catch((err) => {
    console.log("Mongodb connection issue")
    console.log(err)
    process.exit(1)
});


const app = express();
import * as User from './routes/user'
import * as Department from './routes/department'
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }))

app.options("*", cors());

app.post("/upsert-user", User.upsertUser)
app.post("/get-user-list", User.getUserList)
app.post("/get-user-by-id", User.getUserById)
app.post("/delete-user-by-id", User.getDeleteById)
app.post("/get-min-salary-by-department", User.getMinSalaryByDepartment)
app.post("/search-user", User.getSearchedUser)
app.post("/count-user-by-department", User.getuserCountByDepartment)

app.post("/upsert-department", Department.upsertDepartment)
app.post("/get-department-list", Department.getDepartmentList)
app.post("/get-department-by-id", Department.getDepartmentById)
app.post("/delete-department-by-id", Department.getDeleteById)
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});