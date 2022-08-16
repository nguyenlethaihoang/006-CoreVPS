import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Button_Custom({props1}) {
    return (
        <div style={{
        }}>
            {/* <Stack direction="row" spacing={2}> */}
            <Button 
                variant="contained"
                href="#contained-buttons"
                // width="25px"
                size="large"
            >
                {props1}
            </Button>
            {/* </Stack>     */}
        </div>
    )
}

export default Button_Custom;