import { ADD_USER, ADD_DEPARTMENT, USER_LIST, DEPARTMENT_LIST } from "./action";

const initialState = {
    userList: null,
    departmentList: null
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            {
                let { userList } = state;
                if (action.payload) {
                    if (userList?.length) {
                        userList = userList.concat(action.payload)
                    }
                    else {
                        let array = []
                        array = array.concat(action.payload)
                        userList = array
                    }
                }
                return {
                    ...state,
                    userList,
                };
            } case ADD_DEPARTMENT:
            {
                let { departmentList } = state;

                if (action.payload) {
                    if (departmentList?.length) {
                        departmentList = departmentList.concat(action.payload)
                    }
                    else {
                        let array = []
                        array = array.concat(action.payload)
                        departmentList = array
                    }
                }
                return {
                    ...state,
                    departmentList,
                };
            }
        case USER_LIST:
            {
                let { userList } = state;
                if (action.payload) {
                    userList = action.payload
                }
                return {
                    ...state,
                    userList,
                };
            }
        case DEPARTMENT_LIST:
            {
                let { departmentList } = state;
                if (action.payload) {
                    departmentList = action.payload
                }
                return {
                    ...state,
                    departmentList,
                };
            }
        default:
            return state;
    }
};
export default cartReducer