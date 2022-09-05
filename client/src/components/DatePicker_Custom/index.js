import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

function DatePicker_Custom({props1, props2, props3}) {
    // const [value, setValue] = React.useState<Date | null>(null);
    const [value, setValue] = React.useState(null);

    const handleChange = (newValue) => {
        setValue(newValue);
  };

    let idTemp = "dp" + props1.toString().replace(/\s/g, '');
    let widthTemp = props2.toString() + "ch"
    return (
        <div
            style={
                props3.toString() === "NO" ? 
                    {
                        // display:  "inline",
                        marginRight: "20px",
                        marginBottom: "20px" 
                    }
                : 
                    {
                        // lineBreak: "auto",
                        marginRight: "20px",
                        marginBottom: "20px" 
                    }
            }
        >
            <LocalizationProvider 
                dateAdapter={AdapterDateFns}
                // id={idTemp}
                
            >
                <DatePicker
                    label={props1}
                    value={value}   
                    onChange={handleChange}
                    inputFormat="yyyy/MM/dd"
                    renderInput={(params) => <TextField {...params} id={idTemp} />}
                />
            </LocalizationProvider>
        </div>
    )
}

export default DatePicker_Custom;