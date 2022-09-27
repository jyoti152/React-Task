import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withFormik } from "formik";
import * as Yup from "yup";
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DepartmentForm from './departmentForm'
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDepartment, getDepartmentById, getDepartmentList, getUserById, deleteDepartment, UpdateDepartment, getMinSalaryByDepartment } from '../../components/store/action'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
    home: {
        height: '100vh',
        width: '100vw',
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


function Department(props) {
    const classes = useStyles();
    const { departmentList, handleSubmit, values, setValues, resetForm, AddDepartment, getDepartmentById, getUserById, getDepartmentList, deleteDepartment, UpdateDepartment, getMinSalaryByDepartment } = props
    const [state, setState] = React.useState({
        openDrawer: false,

    });
    const callApi = async () => {
        await getDepartmentList();
    };

    useEffect(() => {
        callApi();
    }, []);
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
    const handleEdit = (user) => {
        setState({ ...state, openDrawer: true, });
        setValues({ ...values, ...user, id: user._id, isUpdate: true });
    }
    const handleDelete = async (id) => {
        await deleteDepartment(id)
        await getDepartmentList()
    }
    const handleRefresh = async () => {
        await getDepartmentList()
    }
    return (
        <div className={classes.home}>
            <Drawer anchor={'right'} open={state.openDrawer} >
                <DepartmentForm
                    {...props}
                    state={state}
                    toggleDrawer={toggleDrawer}
                />
                <div>
                    <Button variant="contained" className={classes.button} onClick={handleSubmit}>
                        {values.isUpdate ? "Update" : " Add Department"}
                    </Button>
                </div>
            </Drawer>
            <div className={classes.header}>
                <Button onClick={openDialog} variant="contained">Add Department</Button>
                <Button onClick={handleRefresh} className={classes.refresh} variant="contained"><RefreshIcon /></Button>

            </div>
            <div>
                <List className={classes.root}>

                    {departmentList?.length ? departmentList.map((item, index) => {
                        return <ListItem key={index}>
                            <ListItemText primary={item.name} />
                            <ListItemText primary={item.maxEmployee} />
                            <ListItemText primary={item.maxSalary} />
                            <ListItemText>
                                <Button onClick={() => handleEdit(item)}>
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

const NewDepartment = withFormik({
    enableReinitialize: false,
    mapPropsToValues: () => ({
        isUpdate: false,
        name: '',
        maxEmployee: 0,
        maxSalary: 0
    }),
    validationSchema: () =>
        Yup.object().shape({
            name: Yup.string().trim().required("Enter name"),
            maxEmployee: Yup.number().required(),
            maxSalary: Yup.number().required(),
        }),
    async handleSubmit(values, { props }) {
        let { name, maxEmployee, maxSalary, isUpdate, id } = values
        if (isUpdate) {
            let getMinSalary = await props.getMinSalaryByDepartment(id)
            if (maxSalary < getMinSalary) {
                alert(`Max Salary cant not be less than ${getMinSalary}`)
                return
            } else
                await props.UpdateDepartment(id, name, maxEmployee, maxSalary)
        } else {
            await props.AddDepartment(name, maxEmployee, maxSalary);
        }
        alert(`${isUpdate ? "Updated" : "Saved"}`)

    },
    displayName: "BasicForm",
})(Department);
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            AddDepartment, getDepartmentById, getUserById, getDepartmentList, deleteDepartment,
            UpdateDepartment, getMinSalaryByDepartment
        },
        dispatch
    );
};
const mapStateToProps = (state) => {
    return {
        departmentList: state?.departmentList,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewDepartment)
