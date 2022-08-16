import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import PreviewIcon from '@mui/icons-material/Preview';
import { Box } from "@mui/system";
import { useState } from "react";
import EngineeringIcon from '@mui/icons-material/Engineering';
import Check_Custom from "./Check_Custom";
import Close_Custom from "./Close_Custom";
import Block_Custom from "./Block_Custom";
import UnBlock_Custom from "./UnBlock_Custom";


function Actions({AccountCode}) {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [buttonPopupClose, setButtonPopupClose] = useState(false)
    const [buttonPopupBlock, setButtonPopupBlock] = useState(false)
    const [buttonPopupUnBlock, setButtonPopupUnBlock] = useState(false)


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // console.log("Actions: Account Code")
    // console.log(AccountCode)
    return(
        <div>
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
                                <EngineeringIcon alt="Actions" />
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
                                        setButtonPopup(true)
                                    }
                                }
                            >Check</MenuItem>
                            <MenuItem
                                onClick={
                                    () => {
                                        setButtonPopupClose(true)
                                    }
                                }
                            >Close</MenuItem>
                            <MenuItem
                                onClick={
                                    () => {
                                        setButtonPopupBlock(true)
                                    }
                                }
                            >Block</MenuItem>
                            <MenuItem
                                onClick={
                                    () => {
                                        setButtonPopupUnBlock(true)
                                    }
                                }
                            >Un-Block</MenuItem>
                        </Menu>
                        <Check_Custom 
                            trigger={buttonPopup}
                            setTrigger={setButtonPopup}
                            AccountCode={AccountCode}
                        ></Check_Custom>
                        <Close_Custom
                            trigger={buttonPopupClose}
                            setTrigger={setButtonPopupClose}
                            AccountCode={AccountCode}
                        >
                        </Close_Custom>
                        <Block_Custom
                            trigger={buttonPopupBlock}
                            setTrigger={setButtonPopupBlock}
                            AccountCode={AccountCode}
                        >
                        </Block_Custom>
                        <UnBlock_Custom
                            trigger={buttonPopupUnBlock}
                            setTrigger={setButtonPopupUnBlock}
                            AccountCode={AccountCode}
                        >
                        </UnBlock_Custom>
                    </Box>
        </div>
    )
}

export default Actions