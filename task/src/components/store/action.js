import axios from "axios";

export const ADD_USER = "ADD_USER";
export const ADD_DEPARTMENT = "ADD_DEPARTMENT"
export const USER_LIST = "USER_LIST"
export const DEPARTMENT_LIST = "DEPARTMENT_LIST"

export const AddUser = (name, dob, age, email, profile, password, salary, active, joiningDate, position, department) => {
    return async (dispatch) => {
        try {
            let response = await axios.post("http://localhost:8620/upsert-user", {
                name, dob, age, email, profile, password, salary, active, joiningDate, position, department
            });
            dispatch({ type: ADD_USER, payload: response.data });
        } catch (error) {
            return error;
        }
    };
};
export const getUserList = () => {
    return async (dispatch) => {
        try {
            let response = await axios.post("http://localhost:8620/get-user-list", {
            });
            dispatch({ type: USER_LIST, payload: response.data });
        } catch (error) {
            return error;
        }
    };
};
export const getUserById = (id) => {
    return async (dispatch) => {
        try {
            let response = await axios.post("http://localhost:8620/get-user-by-id", {
                id: id
            });
            let user = response.data
            let date = new Date(response.data.dob)
            user.dob = date
            return user
        } catch (error) {
            return error;
        }
    };
};
export const UpdateUser = (id, name, dob, age, email, profile, password, salary, active, joiningDate, position, department) => {
    return async (dispatch) => {
        try {
            await axios.post("http://localhost:8620/upsert-user", {
                id, name, dob, age, email, profile, password, salary, active, joiningDate, position, department
            });
        } catch (error) {
            return error;
        }
    };
};
export const deleteUser = (id) => {
    return async (dispatch) => {
        try {
            await axios.post("http://localhost:8620/delete-user-by-id", {
                id,
            });
        } catch (error) {
            return error;
        }
    };
};
export const AddDepartment = (name, maxEmployee, maxSalary) => {
    return async (dispatch) => {
        try {
            await axios.post("http://localhost:8620/upsert-department", {
                name, maxEmployee, maxSalary
            });
            dispatch({ type: ADD_DEPARTMENT, payload: { name, name, maxEmployee, maxSalary } });
        } catch (error) {
            return error;
        }
    };
};
export const getDepartmentList = () => {
    return async (dispatch) => {
        try {
            let response = await axios.post("http://localhost:8620/get-department-list", {
            });
            dispatch({ type: DEPARTMENT_LIST, payload: response.data });
        } catch (error) {
            return error;
        }
    };
};
export const getDepartmentById = (id) => {
    return async (dispatch) => {
        try {
            let response = await axios.post("http://localhost:8620/get-department-by-id", {
                id: id
            });
            return response.data
        } catch (error) {
            return error;
        }
    };
};
export const UpdateDepartment = (id, name, maxEmployee, maxSalary) => {
    return async (dispatch) => {
        try {
            await axios.post("http://localhost:8620/upsert-department", {
                id, name, maxEmployee, maxSalary
            });
        } catch (error) {
            return error;
        }
    };
};
export const deleteDepartment = (id) => {
    return async (dispatch) => {
        try {
            let response = await axios.post("http://localhost:8620/delete-department-by-id", {
                id,
            });
        } catch (error) {
            return error;
        }
    };
};
export const getMinSalaryByDepartment = (id) => {
    return async (dispatch) => {
        try {
            let response = await axios.post("http://localhost:8620/get-min-salary-by-department", {
                id,
            });
            if (response?.data && response.data.length) {
                return response.data[0].salary
            }
        } catch (error) {
            return error;
        }
    };
};
export const getSearchedUser = (searchString) => {
    return async (dispatch) => {
        try {
            let response = await axios.post("http://localhost:8620/search-user", {
                searchString
            });
            if (response?.data) {
                dispatch({ type: USER_LIST, payload: response.data });
            }
        } catch (error) {
            return error;
        }
    };
};
export const getUserCount = (id) => {
    return async (dispatch) => {
        try {
            let response = await axios.post("http://localhost:8620/count-user-by-department", {
                id
            });
            return response?.data || 0
        } catch (error) {
            return error;
        }
    };
};