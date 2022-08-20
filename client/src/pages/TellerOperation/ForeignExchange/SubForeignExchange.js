import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField_Custom from "../../../components/TextField_Custom";
import Select_Custom from "../../../components/Select_Custom";
import axios from "axios";
import Popup_Custom from "../../../components/Popup_Custom";
import Popup_Custom_Fail from "../../../components/Popup_Custom_Fail";
import Notification_Custom from "../../../components/Notification_Custom";
import { useState } from "react";

const currencyData = [{id: 1,Name: 'USD' },{id: 2,Name: 'EUR'},{id: 3,Name: 'GBP'},{id: 4,Name: 'JPY'},{id: 5,Name: 'VND'},] 
const debitAccountData = [{id: 1,Name: 'VND - 1001-1126-2002' },{id: 2,Name: 'AUD - 1001-1127-2002'},{id: 3,Name: 'CAD - 1001-1133-2002'},{id: 4,Name: 'EUR - 1001-1122-2002'},{id: 5,Name: 'GBP - 1001-1129-2002'}, {id: 6,Name: 'HKD - 1001-1130-2002'}] 
const creditAccountData = [{id: 1,Name: 'VND - 1001-1126-2002' },{id: 2,Name: 'AUD - 1001-1127-2002'},{id: 3,Name: 'CAD - 1001-1133-2002'},{id: 4,Name: 'EUR - 1001-1122-2002'},{id: 5,Name: 'GBP - 1001-1129-2002'}, {id: 6,Name: 'HKD - 1001-1130-2002'}] 

let arr = []

function checkName(a, b) {
    let temp = null
    a.map((data, index) => {
        if (data.Name == b)
        {
            temp = data.id.toString()
            
        }
    })
    if (a.length == 2) {
        a.map((data, index) => {
            console.log(`index = ${index}`)
            console.log(`data = ${data}`)
            console.log(`data.id = ${data.id}`)
            console.log(`data.Name = ${data.Name}`)
            console.log(`string = ${b}`)
            if (data.Name.toString() == b.toString())
            {
                temp = data.id.toString()
                console.log("bang nhau")
                
            }
        })
    }
    return temp
}

function SubForeignExchange() {
    const [buttonPopup, setButtonPopup] = useState(false) 
    const [buttonPopupFail, setButtonPopupFail] = useState(false)
    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)


    return (
        <div>
            <Accordion >
                <AccordionSummary
                    expandIcon  ={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography 
                        variant="h6" 
                        align="center" 
                        color="#0a3060"
                        fontWeight= "700"
                        sx={{
                            padding: "10px"
                        }}
                    >
                        Foreign Exchange
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingLeft: "30px"}}>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                    >
                        <TextField_Custom props1="Customer Name" props2="40" props3="YES" />
                        <TextField_Custom props1="Address" props2="40" props3="YES" />
                        <TextField_Custom props1="Phone No." props2="20" props3="NO" />

                    </div>
                    <Divider></Divider>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "20px"

                        }}
                    >
                        <TextField_Custom props1="Teller ID*" props2="25" props3="NO" />
                        <Select_Custom props1="Debit Currency" props2="20" props3="YES" props4={currencyData}/>
                        <Select_Custom props1="Debit Account" props2="25" props3="YES" props4={debitAccountData}/>
                        <TextField_Custom props1="Debit Amount FCY" props2="25" props3="NO" />

                        

                    </div>
                    <Divider></Divider>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "20px"

                        }}
                    >
                        <Select_Custom props1="Currency Paid" props2="20" props3="YES" props4={currencyData}/>
                        <TextField_Custom props1="Teller ID" props2="25" props3="NO" />
                        <Select_Custom props1="Credit Account" props2="25" props3="YES" props4={creditAccountData}/>
                        <TextField_Custom props1="Credit Deal Rate" props2="25" props3="NO" />

                    </div>
                    <Divider></Divider>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "20px"

                        }}
                    >
                        <TextField_Custom props1="Narrative" props2="40" props3="NO" />
                        

                    </div>
                    <div
                        style={{ 
                            // display: "flex", 
                            width: "100%", 
                            paddingBottom: "20px",
                            // backgroundColor: "#333", 
                            // flexWrap: "wrap"
                        }}
                    >
                        <Button 
                            sx={{ width: `40ch`, mr: `400px`, padding: ``}} 
                            variant="contained"
                            // color="success"
                            size="large"
                            // href="https://google.com"
                            onClick={() => {

                                let txtCustomerName = document.getElementById('txtCustomerName').value 
                                let txtAddress = document.getElementById('txtAddress').value 
                                let txtTellerID = document.getElementById('txtTellerID*').value

                                let txtDebitAmountFCY = document.getElementById('txtDebitAmountFCY').value
                                let txtCreditDealRate = document.getElementById('txtCreditDealRate').value
                                
                                let txtDebitCurrency = document.getElementById('sltDebitCurrency').innerText.toString()
                                let txtDebitAccount = document.getElementById('sltDebitAccount').innerText.toString()
                                let txtCurrencyPaid = document.getElementById('sltCurrencyPaid').innerText.toString()
                                let txtCreditAccount = document.getElementById('sltCreditAccount').innerText.toString()

                                axios.post('https://api-newcore.vietvictory.vn/exchange/create',{
                                    customerName: txtCustomerName,
                                    address: txtAddress,
                                    tellerIDst: txtTellerID,
                                    debitCurrency: checkName(currencyData, txtDebitCurrency),
                                    currencyPaid: checkName(currencyData, txtCurrencyPaid),
                                    debitAmtFCY: txtDebitAmountFCY,
                                    creditDealRate: txtCreditDealRate,
                                })
                                .then(res => {
                                    console.log("res")
                                    console.log(res)
                                    setButtonPopup(true)
                                })
                                .catch(err=>{
                                    arr = []
                                     if (txtCustomerName.length == 1 || txtCustomerName.length == 0) arr.push(`"Customer Name" is Required`);
                                     if (txtAddress.length == 1 || txtAddress.length == 0) arr.push(`"Address" is Required`);
                                     if (txtTellerID.length == 0) arr.push(`"Teller ID" is Required`);
                                     if (txtDebitCurrency.length == 1 || txtDebitCurrency.length == 0) arr.push(`"Debit Currency" is Required`);
                                     if (txtCurrencyPaid.length == 1 || txtCurrencyPaid.length == 0) arr.push(`"Currency Paid" is Required`);
                                     if (txtDebitAmountFCY.length == 1 || txtDebitAmountFCY.length == 0) arr.push(`"Debit Amount FCY" is Required`);
                                     if (txtCreditDealRate.length == 1 || txtCreditDealRate.length == 0) arr.push(`"Credit Deal Rate" is Required`);
                                     if (txtDebitCurrency == txtCurrencyPaid) arr.push(`"Currency Paid" must be different with "Debit Currency"`);
                                    console.log("err")
                                    console.log(err)

                                    // setButtonPopupFail(true)
                                    setButtonPopupNoti(true)
                                    
                                    
                                })
                            }}
                        >
                            Save
                        </Button>
                        <Popup_Custom 
                            trigger={buttonPopup}
                            setTrigger={setButtonPopup}
                        >
                            
                        </Popup_Custom>
                        <Popup_Custom_Fail 
                            trigger={buttonPopupFail}
                            setTrigger={setButtonPopupFail}
                            
                        >
                            
                        </Popup_Custom_Fail>
                        <Notification_Custom
                            trigger={buttonPopupNoti}
                            setTrigger={setButtonPopupNoti}
                            arr={arr}
                        >

                        </Notification_Custom>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default SubForeignExchange;