import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
    },
    appBar: {
        backgroundColor:'#004d71'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const TopAppBar = ({user}) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        Meteor.logout();
    };


    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <img className='logo' src="/Images/logo.png" alt="logo" />
                </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Lend & Borrow
                    </Typography>
                    
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                                {/* <small>User Name</small> */}
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem>{user?.profile.name}</MenuItem>
                                { user ?
                                    <MenuItem style={{backgroundColor:'rgb(220, 0, 78)', color:'white', borderRadius:'5px'}} onClick={handleLogout}>Logout</MenuItem>
                                    :<MenuItem style={{backgroundColor:'#003fb1', color:'white', borderRadius:'5px'}}>Login First</MenuItem>
                                }
                            </Menu>
                        </div>
                    
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default TopAppBar;