import { Button, Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Select_Custom from '../../../../../components/Select_Custom';
import TextField_Custom from '../../../../../components/TextField_Custom';
import SearchIcon from '@mui/icons-material/Search';
import './Block_Custom.css'
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Select_Value_Custom from '../../../../../components/Select_Value_Custom';
import TextField_Value_Custom from '../../../../../components/TextField_Value_Custom';
import TextField_Value_Custom_No_Data from '../../../../../components/TextField_Value_Custom_No_Data';
import DatePicker_Custom from '../../../../../components/DatePicker_Custom';

const closeOnlineData = [
    {id: 1,
    Name: 'Y' },
    {
    id: 2,
    Name: 'N'},
]

let txtCustomerID = ""
let txtDescription = ""

function Block_Custom(props1) {
    let tmpURL = `https://cb-be.azurewebsites.net/account/debit_account/get/${props1.AccountCode}`
    const [bioFilled, setBioFilled] = useState([]);
    useEffect(() => {
        const fetchDataFilled = async () => {
            const response = await fetch(`${tmpURL}`);
            const data = await response.json();
            console.log("bioFilled block")
            console.log(bioFilled)
            setBioFilled(data.data);  
        };  
        fetchDataFilled();
    }, []);

txtCustomerID = `${bioFilled.CustomerID} - ${bioFilled.GB_FullName}`  
txtDescription = `PHONG TOA TK: ${bioFilled.id}`


  return (props1.trigger) ? 
  (

    <div className="popup">
        <div className='popup-inner'>
            
            <h1>
                Block Account 
            </h1>

            <div
                style={{ 
                    display: "flex", 
                    width: "100%", 
                    flexWrap: "wrap",
                    paddingBottom: "20px"
                }}
            >
                <IconButton>
                    <SearchIcon 
                    />
                </IconButton>
                <IconButton>
                    <PrintIcon />
                </IconButton>
            </div>  

            <div
                style={{ 
                    display: "flex", 
                    width: "100%", 
                    flexWrap: "wrap",
                    paddingBottom: "20px"
                }}
            >
                <h3>Account Code: {bioFilled.id} </h3>
            </div>
            <div
                
                style={{ 
                    display: "flex", 
                    width: "100%", 
                    flexWrap: "wrap"
                }}
            >
                <TextField_Value_Custom_No_Data props1="Customer ID" props2="35" props3="NO" props4={txtCustomerID}/>
                <TextField_Value_Custom_No_Data props1="Account" props2="15" props3="NO" props4={bioFilled.id}/>
                <TextField_Value_Custom_No_Data props1="Amount" props2="20" props3="YES" props4="0"/>
            </div>
            <div
            
            style={{ 
                display: "flex", 
                width: "100%", 
                flexWrap: "wrap",
                paddingBottom: "20px"
            }}
            >
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Block Account" />
                </FormGroup>
            </div>
            <div
                style={{ 
                    display: "flex", 
                    width: "100%", 
                    flexWrap: "wrap"
                }}
            >
                <DatePicker_Custom props1="From Date" props2="350" props3="YES"/>
                <DatePicker_Custom props1="To Date" props2="350" props3="YES"/>
                <TextField_Value_Custom_No_Data props1="Description" props2="35" props3="YES" props4={txtDescription}/>
            </div>
            <div
                style={{ 
                    // display: "flex", 
                    alignItems: "center",
                    width: "100%", 
                    // flexWrap: "wrap",
                    paddingTop: "10px"
                }}
            >
                <Button 
                    className="close-btn"
                    variant='contained'
                    color='success'
                    sx={{
                        marginRight: "30px"
                    }}
                    onClick={() => {props1.setTrigger(false)}
                    }
                >
                    Save
                </Button>

                <Button 
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
    </div>
  ) :  "";
}

export default Block_Custom