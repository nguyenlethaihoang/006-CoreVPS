import { Button } from '@mui/material'
import React from 'react'
import './Popup_Custom_Fail.css'

function Popup_Custom_Fail(props1) {
  return (props1.trigger) ? 
  (

    <div className="popup">
        <div className='popup-inner'>
            
            <img 
                src = {process.env.PUBLIC_URL + `/Imgs/fail.png`}
                alt = "Added successfully"
            />
            <h3>
                Oh no! You have added failed! 
            </h3>
            <Button 
                className="close-btn"
                variant='contained'
                color='error'
                onClick={() => {props1.setTrigger(false)}
                }
            >
                Go to dashboard
            </Button>
        </div>
    </div>
  ) :  "";
}

export default Popup_Custom_Fail