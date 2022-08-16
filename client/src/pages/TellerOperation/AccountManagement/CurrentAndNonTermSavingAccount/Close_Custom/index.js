import { Button, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Select_Custom from '../../../../../components/Select_Custom';
import TextField_Custom from '../../../../../components/TextField_Custom';
import SearchIcon from '@mui/icons-material/Search';
import './Close_Custom.css'
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import Select_Value_Custom from '../../../../../components/Select_Value_Custom';
import TextField_Value_Custom from '../../../../../components/TextField_Value_Custom';
import TextField_Value_Custom_No_Data from '../../../../../components/TextField_Value_Custom_No_Data';

const closeOnlineData = [
    {id: 1,
    Name: 'Y' },
    {
    id: 2,
    Name: 'N'},
]

function Close_Custom(props1) {
    let tmpURL = `https://cb-be.azurewebsites.net/account/debit_account/get/${props1.AccountCode}`
    const [bioFilled, setBioFilled] = useState([]);
    useEffect(() => {
        const fetchDataFilled = async () => {
            const response = await fetch(`${tmpURL}`);
            const data = await response.json();
            setBioFilled(data.data);  
        };  
        fetchDataFilled();
    }, []);

  return (props1.trigger) ? 
  (

    <div className="popup">
        <div className='popup-inner'>
            
            <h1>
                Close Account 
            </h1>

            <div
                style={{ 
                    display: "flex", 
                    width: "100%", 
                    flexWrap: "wrap",
                    paddingBottom: "20px"
                }}
            >
                <Button>
                    Close Account
                </Button>
                <Button>
                    FT Acc Close
                </Button>
            </div>
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
                <Select_Custom props1="Close Online" props2="30" props3="NO" props4={closeOnlineData}/>
                <TextField_Value_Custom_No_Data props1="Currency" props2="35" props3="NO" props4="VND"/>
                <TextField_Value_Custom_No_Data props1="Working Ballance" props2="35" props3="NO" props4=""/>
                <TextField_Value_Custom_No_Data props1="Standing Orders" props2="15" props3="NO" props4="NO"/>
                <TextField_Value_Custom_No_Data props1="Working UnclearedEntries" props2="15" props3="NO" props4="NO"/>
                <TextField_Value_Custom_No_Data props1="Cheques OS" props2="15" props3="NO" props4="NO"/>
                <TextField_Value_Custom_No_Data props1="Bank Cards" props2="15" props3="NO" props4="NO"/>
                <TextField_Value_Custom_No_Data props1="CC Chgs OS" props2="25" props3="NO" props4="0"/>
                <TextField_Value_Custom_No_Data props1="Total Credit Interest" props2="30" props3="NO" props4=""/>
                <TextField_Value_Custom_No_Data props1="Total Debit Interest" props2="30" props3="NO" props4=""/>
                <TextField_Value_Custom_No_Data props1="Total Charges" props2="30" props3="NO" props4=""/>
                <TextField_Value_Custom_No_Data props1="Total VAT" props2="30" props3="NO" props4="0"/>
                <TextField_Value_Custom_No_Data props1="Int.CAP to AC" props2="30" props3="NO" props4=""/>
                <TextField_Value_Custom_No_Data props1="Trans Ref Next" props2="30" props3="NO" props4=""/>
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

export default Close_Custom