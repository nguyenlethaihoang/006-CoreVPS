import './Header.css'
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

import { useEffect, useState } from 'react';
import * as React from 'react';
// import Search_Custom from '../../components/Search_Custom';
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography} from '@mui/material';

function checkDay() {
    let tmp = ""
    var dayOfWeek = new Date();
    if (dayOfWeek.getDay() === 1) tmp = "Monday";
    else if (dayOfWeek.getDay() === 2) tmp = "Tuesday";
    else if (dayOfWeek.getDay() === 3) tmp = "Wednesday";
    else if (dayOfWeek.getDay() === 4) tmp = "Thursday";
    else if (dayOfWeek.getDay() === 5) tmp = "Friday";
    else if (dayOfWeek.getDay() === 6) tmp = "Saturday";
    else tmp = "Sunday";
    return tmp.toString();
}
function checkMonth() {
    let tmp = ""
    var month = new Date();
    if (month.getMonth()+ 1 === 1) tmp = "January";
    else if (month.getMonth()+ 1 === 2) tmp = "February";
    else if (month.getMonth()+ 1 === 3) tmp = "March";
    else if (month.getMonth()+ 1 === 4) tmp = "April";
    else if (month.getMonth()+ 1 === 5) tmp = "May";
    else if (month.getMonth()+ 1 === 6) tmp = "June";
    else if (month.getMonth()+ 1 === 7) tmp = "July";
    else if (month.getMonth()+ 1 === 8) tmp = "August";
    else if (month.getMonth()+ 1 === 9) tmp = "September";
    else if (month.getMonth()+ 1 === 10) tmp = "October";
    else if (month.getMonth()+ 1 === 11) tmp = "November";
    else tmp = "December"
    return tmp.toString();
}
function checkDate() {
    var date = new Date();
    return date.getDate().toString();
}
function checkYear() {
    var date = new Date();
    return date.getFullYear().toString();
}

function checkHour() {
    let tmp = ""
    let tmpHour = 0
    var date = new Date();
    tmpHour = date.getHours()
    if (tmpHour > 12)
    tmpHour -= 12
    tmp = tmpHour.toString()
    if (tmp.length == 1) tmp = '0' + tmp
    return tmp;
}
function checkMinute() {
    let tmp = ""
    var date = new Date();
    tmp = date.getMinutes().toString();
    if (tmp.length == 1) tmp = "0"+tmp
    return tmp;
}

function checkAPM() {
    let tmp = ""
    let tmpHour = 0
    var date = new Date();
    tmpHour = date.getHours()
    if (tmpHour > 12) tmp = "PM";
    else tmp = "AM"
    return tmp;
}

function Header() {    

    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [searchResult, setSearchResult] = useState([])
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, ,2, 3]);
        }, 0)
    })
    
    var today = new Date();
    
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const day = today.getDay();
    let dateOnHeader = checkDay()+', ' + checkMonth()  + ' ' + checkDate() + '. ' + checkYear();
    let hourOnHeader = checkHour()+':' + checkMinute() + ' ' +checkAPM();
    // const isWeekend = (day === 6 || day === 7); 

    return (
        <header className='wrapper'
        >
            <div className='inner'>
                <div className='logo'>
                    <img 
                        src = {process.env.PUBLIC_URL + `/Imgs/logo.png`}
                        alt = "VietVictory"
                        width= "96"
                        height = "60"
                    />
                </div>
                <div className='university_logo'>
                    <img 
                            src = "https://app.universityhub.com/assets/images/univ-hub-logo-only.png"
                            alt = "Hub_University"
                            width= "70"
                            height = "55"
                        />
                </div>
{/* 
                <div className='search_bar'>
                    <Search_Custom />
                </div> */}

                <div className='time'>
                    <Typography variant="h7" component="h4">{hourOnHeader}</Typography>
                    
                </div>
                <div className='timeDate'>
                    <Typography variant="h7" component="h4">{dateOnHeader}</Typography>
                </div>
                <div className='email_logo'>
                        <EmailIcon 
                            sx={{ 
                                display: "flex",
                                marginRight: '5px',
                                // padding: 'px'
                            }} 
                        />
                </div>

                <div className='bell_logo'>
                    <NotificationsIcon
                        // sx={{ display: { xs: "flex" }}}
                        />
                </div>

                <div className='avt_logo'>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton 
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2, p:0 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                              elevation: 0,
                              sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                '&:before': {
                                  content: '""',
                                  display: 'block',
                                  position: 'absolute',
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: 'background.paper',
                                  transform: 'translateY(-50%) rotate(45deg)',
                                  zIndex: 0,
                                },
                              },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            {/* <MenuItem >Profile</MenuItem>
                            <MenuItem >My account</MenuItem> */}
                            <MenuItem 
                                onClick={
                                    () => {
                                        window.localStorage.removeItem('name')
                                        window.localStorage.removeItem('pass')
                                        window.location.reload()

                                        // window.history.pushState('Login', 'Title Login', '/login')
                                        // window.history.pushState('Login', 'Title Login', '/login')
                                    }
                                }
                            >Logout</MenuItem>
                        </Menu>
                    </Box>
                </div>
                <div className='name_user'>
                    <p><b>Admin</b></p>
                </div>
            </div>


        </header>
    )
}

export default Header;