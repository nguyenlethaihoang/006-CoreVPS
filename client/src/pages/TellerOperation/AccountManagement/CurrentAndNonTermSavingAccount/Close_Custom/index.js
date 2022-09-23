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
import axios from 'axios';
import Popup_Custom from '../../../../../components/Popup_Custom';
import Notification_Custom from '../../../../../components/Notification_Custom';

const closeOnlineData = [ 
    {id: 1,
    Name: 'Y' },
    {
    id: 2,
    Name: 'N'},
]

let arr = []

const paymentTypeData = [ 
    {id: 1,
    Name: 'Cash' },
    {
    id: 2,
    Name: 'Intermediary Account'},
    {
    id: 3,
    Name: 'Account'},
]

function Close_Custom(props1) {

    const [buttonPopup, setButtonPopup] = useState(false) 

    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)
    let tmpURL = `https://api-newcore.vietvictory.vn/account/debit_account/get/${props1.AccountCode}`
    const [bioFilled, setBioFilled] = useState([]);
    useEffect(() => {
        const fetchDataFilled = async () => {
            const response = await fetch(`${tmpURL}`);
            const data = await response.json();
            setBioFilled(data.data);  
        };  
        fetchDataFilled();
    }, []);


    console.log("Working Amount")
    console.log(bioFilled.WorkingAmount)
    let txtCustomerID = `${bioFilled.CustomerID} - ${bioFilled.Customer?.GB_FullName}`  



    // Get current date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let strtoday = yyyy +"/" +  mm + "/" + dd;

    let hh = String(today.getHours());
    let mms = String(today.getMinutes());
    let ss = String(today.getSeconds());
    let datetime = yyyy + "/" + mm + "/" + dd + "   " + hh + ":" + mms + ":" + ss

    // static data
    let
        txtOverride = " ",
        txtRecordStatus = "IHLD  INPUT Held",
        txtCurrentNumber = "1",
        txtInputter = "112_ID2054_I_INAU",
        txtInputter2 = "112_SYSTEM",
        txtAuthorised = " ",
        txtDateTime = datetime,
        txtCompanyCode = " ",
        txtDepartmentCode = "1"

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
                <Button 
                    onClick = {()=>{
                        console.log("Close-Account Press")
                        document.getElementById('Close-Account').style.display = 'flex'
                        document.getElementById('FT-Acc-Close').style.display = 'none'

                    }}>
                    Close Account
                </Button>
                <Button
                    onClick={()=>{
                        console.log("FT-Acc-Close Press")
                        document.getElementById('Close-Account').style.display = 'none'
                        document.getElementById('FT-Acc-Close').style.display = 'flex'

                    }}
                >
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
                    width: "100%", 
                    flexWrap: "wrap",
                    paddingBottom: "20px"
                }}
            >
                <h3>Account Code: {bioFilled.id} </h3>
            </div>


            <div
                id="Close-Account"
                style={{ 
                    display: "flex", 
                    width: "100%", 
                    flexWrap: "wrap"
                }}
            >   
                
                <Select_Custom props1="Close Online" props2="30" props3="NO" props4={closeOnlineData}/>
                <TextField_Value_Custom_No_Data props1="Currency" props2="35" props3="NO" props4="VND"/>
                <TextField_Value_Custom_No_Data props1="Working Ballance" props2="35" props3="NO" props4={bioFilled.WorkingAmount}/>
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
                id="FT-Acc-Close"
                style={{  
                    display: "none", 
                    width: "100%", 
                    flexWrap: "wrap"
                }}
            >   

                    <TextField_Value_Custom_No_Data props1="Customer ID." props2="35" props3="NO" props4={txtCustomerID}/>
                    <TextField_Value_Custom_No_Data props1="Account." props2="15" props3="NO" props4={bioFilled.id}/>
                    <TextField_Value_Custom_No_Data props1="Currency." props2="15" props3="NO" props4={bioFilled.CURRENCY.Name}/>
                    <TextField_Value_Custom_No_Data props1="Amount." props2="20" props3="NO" props4={bioFilled.WorkingAmount}/>
                    <TextField_Value_Custom_No_Data props1="Debit Date." props2="20" props3="NO" props4={strtoday}/>

                    {/* error: cannot map  */}
                    <Select_Custom props1="Payment Type." props2="25" props3="account_officer" props4={paymentTypeData}/>
                    <TextField_Value_Custom props1="Transfer Account." props2="35" props3="YES" props4=""/>
                    <TextField_Value_Custom_No_Data props1="Credit Currency." props2="15" props3="YES" props4=""/>
                    <TextField_Value_Custom_No_Data props1="Account Paid." props2="20" props3="YES" props4=""/>
                    <TextField_Value_Custom_No_Data props1="Credit Amount." props2="20" props3="NO" props4={bioFilled.WorkingAmount}/>
                    <TextField_Value_Custom_No_Data props1="Narrative." props2="20" props3="YES" props4=""/>
                    <TextField_Value_Custom_No_Data props1="Override." props2="20" props3="NO" props4={txtOverride}/>
                    <TextField_Value_Custom_No_Data props1="Record Status." props2="35" props3="NO" props4={txtRecordStatus}/>
                    <TextField_Value_Custom_No_Data props1="Current Number." props2="15" props3="NO" props4={txtCurrentNumber}/>
                    <TextField_Value_Custom_No_Data props1="Inputter." props2="35" props3="NO" props4={txtInputter}/>
                    <TextField_Value_Custom_No_Data props1="Inputter2." props2="35" props3="NO" props4={txtInputter2}/>
                    <TextField_Value_Custom_No_Data props1="Authorised." props2="20" props3="NO" props4={txtAuthorised}/>
                    <TextField_Value_Custom_No_Data props1="Date time." props2="30" props3="NO" props4={txtDateTime}/>
                    <TextField_Value_Custom_No_Data props1="Company Code." props2="15" props3="NO" props4={txtCompanyCode}/>
                    <TextField_Value_Custom_No_Data props1="Department Code." props2="15" props3="NO" props4={txtDepartmentCode}/>
                        


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
                    onClick={() => {
                        props1.setTrigger(false)
                        let
                            txtNarrative = document.getElementById('txtNarrative.').value.toString(),
                            txtTransferAccount = document.getElementById('txtTransferAccount.').value.toString(),
                            txtPaymentType = document.getElementById('sltPaymentType.').innerText.toString(),
                            txtCloseDate = document.getElementById('txtDebitDate.').value.toString()


                        axios.put(`https://api-newcore.vietvictory.vn/account/debit_account/close/${props1.AccountCode}`, {
                            paymentType: txtPaymentType,
                            transferredAccount: txtTransferAccount,
                            closeDate: txtCloseDate,
                            notes: txtNarrative
                        })
                        .then( res => {
                            console.log("ressss")
                            console.log(res)
                            setButtonPopup(true)
                        })
                        .catch(err => {
                            console.log(err)
                            console.log("errrrrrrrr")
                            console.log(err.response.data)
                            arr = []
                            console.log("Stringgg")
                            console.log(txtPaymentType)
                            console.log(bioFilled.Status)

                            if(bioFilled.Status == 'closed'){
                                arr.push("Account was closed!")
                            }else{
                                if(txtPaymentType.length == 1){
                                    arr.push("Payment_Type is required!")
                                }else if(txtPaymentType == 'Account' || txtPaymentType == 'Intermediary Account'){
                                    if(!txtTransferAccount){
                                        arr.push('Transfer_Account is required!')
                                    }else{
                                        arr.push('Transfer Account is invalid!')
                                    }
                                }
                            }
                            setButtonPopupNoti(true)
                            
                        })
                        props1.setTrigger(true)
                    }
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
                <Popup_Custom 
                    trigger={buttonPopup}
                    setTrigger={setButtonPopup}
                >
                    
                </Popup_Custom>
                <Notification_Custom
                    trigger={buttonPopupNoti}
                    setTrigger={setButtonPopupNoti}
                    arr={arr}
                >

                </Notification_Custom>
            </div>
            
        </div>
    </div>
  ) :  "";
}

export default Close_Custom