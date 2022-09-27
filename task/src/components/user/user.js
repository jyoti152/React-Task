import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withFormik } from "formik";
import * as Yup from "yup";
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import UserForm from './userForm'
import DeleteIcon from '@material-ui/icons/Delete';
import { AddUser, getUserList, getUserById, UpdateUser, deleteUser, getDepartmentList, getSearchedUser, getUserCount } from '../../components/store/action'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useDebouncedCallback } from "use-debounce";
import Input from '@material-ui/core/Input';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
    home: {
        height: '100vh',
        width: '100vw',
    },
    search: {
        width: '60%',
        border: '1px',
        borderColor: "black",
        display: "flex",
        justifyContent: 'center',
    },
    searchInput: {
        background: '#C1C1C1',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    header: {
        display: 'flex',
        margin: '10px'
    },
    button: {
        display: 'flex',
        justifyContent: "center",
        marginTop: "20px"
    },
    refresh: {
        marginLeft: '10px'
    }
}));


function User(props) {
    const classes = useStyles();
    const { userList, handleSubmit, values, setValues, resetForm, AddUser, UpdateUser, getUserList, getUserById, deleteUser, getDepartmentList, departmentList, getSearchedUser, getUserCount } = props
    const callApi = async () => {
        await getUserList();
        await getDepartmentList()
    };

    useEffect(() => {
        callApi();
    }, []);
    const [state, setState] = React.useState({
        openDrawer: false,

    });
    const calculateAge = (dob) => {
        dob = new Date(dob)
        var diff = Date.now() - dob.getTime();
        var age = new Date(diff);
        let ageCal = Math.abs(age.getUTCFullYear() - 1970);
        return ageCal
    }
    const handleDOBChange = (date) => {
        let ageCal = calculateAge(date)
        setValues({ ...values, age: ageCal, dob: date });
    }
    const handleDateChange = (date) => {
        let ageCal = calculateAge(date)
        setValues({ ...values, joiningDate: date });
    }
    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            var filereader = new FileReader();
            filereader.readAsDataURL(file);
            filereader.onload = function (evt) {
                var base64 = evt.target.result;
                setValues({ ...values, profile: base64 });
                return base64
            }
        }
    }
    const openDialog = () => {
        setState({
            ...state,
            openDrawer: !state.openDrawer
        });
    }
    const toggleDrawer = () => {
        resetForm()
        setState({ ...state, openDrawer: !state.openDrawer });
    };
    const handleEdit = async (id) => {
        let user = await getUserById(id)
        setState({ ...state, openDrawer: true, });
        setValues({ ...values, ...user, isUpdate: true, id: id });
    }
    const handleImageRemove = () => {
        setValues({ ...values, profile: "" });
    }
    const handleDelete = async (id) => {
        await deleteUser(id)
        await getUserList()
    }
    async function handleSearchText(target) {
        setValues({ ...values, searchString: target.value })
        //Added character length condition to save API calls
        if (target.value?.trim()?.length >= 3 || target.value?.length === 0)
            await debounced(target);
        else getUserList();
    }

    const debounced = useDebouncedCallback(async (target) => {
        if (target.value) await getSearchedUser(target.value);
        else if (target.value?.length === 0) getUserList();
    }, 1000);

    const handleRefresh = async () => {
        setValues({ ...values, searchString: '' })
        await getUserList()
    }
    return (
        <div className={classes.home}>
            <Drawer anchor={'right'} open={state.openDrawer} >
                <UserForm
                    {...props}
                    state={state}
                    toggleDrawer={toggleDrawer}
                    calculateAge={calculateAge}
                    handleDOBChange={handleDOBChange}
                    handleProfileChange={handleProfileChange}
                    handleImageRemove={handleImageRemove}
                    departmentList={departmentList}
                    handleDateChange={handleDateChange}
                />
                <div className={classes.button}>
                    <Button variant="contained" onClick={handleSubmit}>
                        {values.isUpdate ? "Update" : " Add user"}
                    </Button>
                </div>
            </Drawer>
            <div className={classes.header}>
                <Button onClick={openDialog} variant="contained">Add User</Button>
                <Button onClick={handleRefresh} className={classes.refresh} variant="contained"><RefreshIcon /></Button>
                {userList?.length ?
                    <div className={classes.search}>
                        <Input
                            placeholder="Search ..."
                            className={classes.searchInput}
                            disableUnderline
                            autoFocus
                            value={values.searchString || ""}
                            onChange={(event) => handleSearchText(event.target)}
                        />
                    </div> : null}
            </div>
            <div>
                <List className={classes.root}>

                    {userList?.length ? userList.map((item, index) => {
                        return <ListItem key={index}>
                            <ListItemAvatar>
                                {!item?.profile?.trim() ?
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar> :
                                    <Avatar src={item.profile} />}
                            </ListItemAvatar>
                            <ListItemText primary={item.name} />
                            <ListItemText primary={item.email} />
                            <ListItemText primary={new Date(item.dob).toLocaleDateString()} />
                            <ListItemText primary={item?.department?.name} />
                            <ListItemText primary={new Date(item.joiningDate).toLocaleDateString()} />
                            <ListItemText>
                                <Button onClick={() => handleEdit(item._id)}>
                                    <EditIcon />
                                </Button>
                                <Button >
                                    <DeleteIcon onClick={() => handleDelete(item._id)} />
                                </Button>
                            </ListItemText>
                        </ListItem>
                    }) : null}
                </List>

            </div>

        </div>
    );
}

const NewUser = withFormik({
    enableReinitialize: false,
    mapPropsToValues: () => ({
        isUpdate: false,
        name: '',
        dob: "",
        email: '',
        profile: '',
        password: '',
        salary: '',
        active: 0,
        joiningDate: "",
        position: '',
        age: '',
        department: null,
        searchString: ""
    }),
    validationSchema: () =>
        Yup.object().shape({
            name: Yup.string().trim().required("Enter name"),
            dob: Yup.string().required(),
            email: Yup.string().email("Enter valid email").required(),
            password: Yup.string().trim().required(),
            salary: Yup.string().trim().required(),
            joiningDate: Yup.string().trim().required(),
            position: Yup.string().trim().required(),
            age: Yup.string().trim().required(),
            department: Yup.object().required()
        }),
    async handleSubmit(values, { props }) {
        let { name, dob, age, email, profile, password, salary, active, joiningDate, position, department } = values
        let count = await props.getUserCount(values.department._id)
        if (values.salary > values.department.maxSalary) {
            alert(`Maximum salary of ${department.name} is ${department.maxSalary}`)
            return
        }
        if (count >= values.department.maxEmployee) {
            alert(`Maximum Employee of ${department.name} are ${department.maxEmployee}`)
            return
        }
        else {
            if (values.isUpdate) {
                await props.UpdateUser(values.id, name, dob, age, email, profile, password, salary, active, joiningDate, position, department)
                await getUserList()
            } else {
                await props.AddUser(name, dob, age, email, profile, password, salary, active, joiningDate, position, department);
            }
        }
        alert(`${values.isUpdate ? "Updated" : "Saved"}`)

    },
    displayName: "BasicForm",
})(User);
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            AddUser,
            getUserList,
            getUserById,
            UpdateUser,
            deleteUser,
            getDepartmentList,
            getSearchedUser,
            getUserCount
        },
        dispatch
    );
};
const mapStateToProps = (state) => {
    return {
        userList: state?.userList,
        departmentList: state?.departmentList,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewUser)
