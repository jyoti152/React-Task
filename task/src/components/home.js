import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import User from './user/user'
import Department from "./department/department";

const useStyles = makeStyles((theme) => ({
    home: {
        padding: 10,
        overflow: 'hidden'
    },
    sidebar: {
        backgroundColor: '#3f51b5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    content: {
        display: 'flex',
        height: 'auto',
        overflow: 'hidden',
        marginTop: '10px',
    },
    button: {
        margin: '10px'
    },
    title: {
        textTransform: "uppercase"
    }
}));
function Home(props) {
    const classes = useStyles();
    const [view, setView] = React.useState('user');
    const handleChange = (value) => {
        setView(value);
    };
    return (
        <div className={classes.home}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {view}  MANAGEMENT SYSTEM
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>

                <div className={classes.sidebar}>
                    <Button onClick={() => handleChange('user')} className={classes.button} variant="contained">Users</Button>
                    <Button onClick={() => handleChange('department')} className={classes.button} variant="contained">Departments</Button>
                </div>
                <div>
                    {
                        view === 'user' ? <User /> : view === 'department' ? <Department /> : <div>Not Found</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;
