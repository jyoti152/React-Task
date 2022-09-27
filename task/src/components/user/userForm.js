import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, Button } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
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
    },
    margin: {
        marginTop: '10px',
        marginBottom: '10px'
    }
}));


function UserForm(props) {
    const classes = useStyles();
    const { toggleDrawer,
        handleDOBChange,
        handleProfileChange,
        handleChange,
        handleBlur,
        touched,
        errors,
        values,
        handleSubmit,
        handleImageRemove,
        departmentList,
        handleDateChange
    } = props
    return (
        <div className={classes.form}>
            <div className={classes.header}>
                <Typography>Add </Typography>
                <div className={classes.close}>
                    <CloseIcon onClick={toggleDrawer} />
                </div>
            </div>
            <div>
                {!values.profile.trim() ?
                    <TextField
                        fullWidth
                        type="file"
                        variant="outlined"
                        margin="dense"
                        name="profile"
                        label="profile"
                        value={values.profile}
                        onChange={handleProfileChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> :

                    <div><img height={100} width={100} src={values.profile} />
                        <Button onClick={handleImageRemove}>Remove</Button>
                    </div>
                }
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

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        fullWidth
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        name="dob"
                        placeholder="Birth Date"
                        value={values.dob}
                        onChange={handleDOBChange}
                        onBlur={handleBlur}
                        error={!!touched.dob && !!errors.dob}
                        helperText={touched.dob && errors.dob}
                        inputVariant={"outlined"}
                        InputProps={{
                            style: {
                                fontSize: 14,
                                height: 44
                            }
                        }}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <div className={classes.margin}>
                    Age : {values?.age || "0"}
                </div>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                />

                <TextField
                    fullWidth
                    type="password"
                    variant="outlined"
                    margin="dense"
                    name="password"
                    label="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                />
                <Select
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                    margin="dense"
                    name="department"
                    label="Department"
                    value={values?.department}
                    onChange={handleChange}
                    placeholder="Department"
                    onBlur={handleBlur}
                    error={!!touched.department && !!errors.department}
                    helperText={touched.department && errors.department}
                >
                    {departmentList && departmentList?.length && departmentList.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    type="number"
                    name="salary"
                    label="salary"
                    value={values.salary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.salary && !!errors.salary}
                    helperText={touched.salary && errors.salary}
                />
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    name="active"
                    label="active"
                    value={values.active}
                    onChange={handleChange}>
                    {[{ label: "Active", value: true }, { label: "In Active", value: false }].map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        name="joiningDate"
                        placeholder="Joining Date"
                        value={values.joiningDate}
                        onChange={handleDateChange}
                        onBlur={handleBlur}
                        error={!!touched.joiningDate && !!errors.joiningDate}
                        helperText={touched.joiningDate && errors.joiningDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        InputProps={{
                            style: {
                                fontSize: 14,
                                height: 44
                            }
                        }}
                        fullWidth
                        inputVariant={"outlined"}

                    />
                </MuiPickersUtilsProvider>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    name="position"
                    label="position"
                    value={values.position}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.position && !!errors.position}
                    helperText={touched.position && errors.position}
                />

            </div>

        </div>
    );
}

export default UserForm;
