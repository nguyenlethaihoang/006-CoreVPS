import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";    
import { useEffect, useState } from "react";
import Select_Custom from "../../../../components/Select_Custom";
import TextField_Custom from "../../../../components/TextField_Custom";
import { padding } from "@mui/system";
import Popup_Custom from "../../../../components/Popup_Custom";
import Popup_Custom_Fail from "../../../../components/Popup_Custom_Fail";
import axios from "axios";
import Notification_Custom from "../../../../components/Notification_Custom";


const accountTypeData = [
    {id: 1,
    Name: 'Current & Non-Term Saving Account' },
    {
    id: 2,
    Name: 'Saving Account - Arrear'},
    {
    id: 3,
    Name: 'Saving Account - Periodic'},
    {
    id: 4,
    Name: 'Saving Account - Discounted'},
    {
    id: 5,
    Name: 'Loan Working Account'},
]

const currencyData = [{id: 1,Name: 'EUR' },{id: 2,Name: 'USD'},{id: 3,Name: 'GBP'},{id: 4,Name: 'JPY'},{id: 5,Name: 'VND'},]


const waiveChargesData = [
    {id: 1,
    Name: 'YES' },
    {
    id: 2,
    Name: 'NO'},

]

function CashWithdrawal() {
    const [age, setAge] = useState('');
    const [cashAccount, setCashAccount] = useState('');
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
                        1.4 Cash Withdrawal
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
                        <Select_Custom props1="Account Type" props2="35" props3="city" props4={accountTypeData}/>
                        <TextField 
                            id="txtCustomerAccount" 
                            label="Customer Account" 
                            variant="outlined" 
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                            required
                            onChange={() => {
                                
                            }}
                        />
                        <TextField 
                            id="txtCurrency" 
                            label="Currency" 
                            variant="outlined" 
                            disabled
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtAmount" 
                            label="Amount" 
                            variant="outlined" 
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtNarrative" 
                            label="Narrative" 
                            variant="outlined" 
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                    </div>
                    <br></br>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                    >
                        <TextField 
                            id="txtTellerID" 
                            label="Teller ID" 
                            variant="outlined" 
                            required
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                    </div>
                    <br></br>
                    
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                    >
                        <FormControl sx={{ m: 0, minWidth: `25ch`,marginRight: "30px",marginBottom: "20px" }}>
                            <InputLabel id="lblCurrencyPaid">Currency Paid</InputLabel>
                            <Select
                                labelId="lblCurrencyPaid"
                                id="sltCurrencyPaid"

                                value={age}
                                label="Currency Paid"
                                onChange={(event) => {
                                    setAge(event.target.value)
                                    setCashAccount(`${currencyData[event.target.value-1].Name} - 1001-1122-2002`)
                                }}
                            >
                                {currencyData.map((data,index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        {/* Show Account */}
                        <TextField 
                            id="txtCashAccount" 
                            label="Cash Account" 
                            variant="outlined" 
                            value={cashAccount}
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtDealRate" 
                            label="Deal Rate" 
                            variant="outlined" 
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtAmountPaid" 
                            label="Amount Paid" 
                            variant="outlined" 
                            disabled
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtCustBal" 
                            label="Cust Bal" 
                            variant="outlined" 
                            disabled
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtNewCustBal" 
                            label="New Cust Bal" 
                            variant="outlined" 
                            disabled
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                    </div>
                    <br></br>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                    >
                        <Select_Custom props1="Waive Charges?" props2="35" props3="city" props4={waiveChargesData}/>
                        <TextField 
                            id="txtPrintLnNoofPS" 
                            label="Print LnNo of PS" 
                            // variant="outlined" 
                            value="1"
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default CashWithdrawal