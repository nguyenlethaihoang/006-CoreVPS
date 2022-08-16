import { Button } from '@mui/material'
import React from 'react'
import './Notification_Custom.css'
import DangerousIcon from '@mui/icons-material/Dangerous';
import { textAlign } from '@mui/system';

let value

function Notification_Custom(props1) {
  return (props1.trigger) ? 
  (

    <div className="popup">
        <div className='popup-inner-noti'>
            
            {/* <img 
                src = {process.env.PUBLIC_URL + `/Imgs/fail.png`}
                alt = "Added failed"
            /> */}
            
            <div
                style={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center"
                }}  
            >
                <DangerousIcon 
                    color="error"
                    sx={{
                        paddingRight: "2px"
                    }}
                />
                <h3>Added failed</h3>
            </div>
                {/* Missing value */}
            {props1.arr.map((value) => 
                <div
                    style= {{
                        paddingBottom: "10px"
                    }}
                >
                    {value}
                </div>
            )}  
            
            
            <Button 
                sx={{
                    marginTop: "20px"
                }}
                className="close-btn"
                variant='contained'
                color='error'
                onClick={() => {props1.setTrigger(false)}
                }
            >
                Cancel
            </Button>
        </div>
    </div>
  ) :  "";
}

export default Notification_Custom