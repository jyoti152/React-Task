import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(() => ({
    form: {
        padding: 10,
        minWidth: '600px',
        maxWidth: '600px'
    },
    header: {
        width: "100%",
        display: "flex"
    },
    close: {
        width: "100%",
        display: "flex",
        justifyContent: "end"
    }
}));


function DepartmentForm(props) {
    const classes = useStyles();
    const { toggleDrawer,
        handleChange,
        handleBlur,
        touched,
        errors,
        values } = props
    return (
        <div className={classes.form}>
            <div className={classes.header}>
                <Typography>Add Department </Typography>
                <div className={classes.close}>
                <CloseIcon onClick={toggleDrawer}/>
                </div>
            </div>
            <div>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    name="maxEmployee"
                    label="Max Employee"
                    value={values.maxEmployee}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.maxEmployee && !!errors.maxEmployee}
                    helperText={touched.maxEmployee && errors.email}
                />

                <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    type="number"
                    name="maxSalary"
                    label="Max Salary"
                    value={values.maxSalary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.maxSalary && !!errors.maxSalary}
                    helperText={touched.maxSalary && errors.maxSalary}
                />

            </div>

        </div>
    );
}

export default DepartmentForm;
