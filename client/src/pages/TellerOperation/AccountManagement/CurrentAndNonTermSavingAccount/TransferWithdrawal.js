import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";    
import { useEffect, useState } from "react";
import Select_Custom from "../../../../components/Select_Custom";
import TextField_Custom from "../../../../components/TextField_Custom";
import { padding } from "@mui/system";
import Popup_Custom from "../../../../components/Popup_Custom";
import Popup_Custom_Fail from "../../../../components/Popup_Custom_Fail";
import axios from "axios";
import Notification_Custom from "../../../../components/Notification_Custom";
import DatePicker_Custom from "../../../../components/DatePicker_Custom";

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

const waiveChargesData = [
    {id: 1,
    Name: 'YES' },
    {
    id: 2,
    Name: 'NO'},

]

function TransferWithdrawal() {
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
                        1.5 Transfer Withdrawal
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
                        <h3>Debit Information</h3>
                    </div>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                    >
                        <TextField 
                            id="txtCustomer" 
                            label="Customer" 
                            variant="outlined" 
                            disabled
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <Select_Custom props1="Account Type" props2="35" props3="city" props4={accountTypeData}/>
                        <TextField 
                            id="txtDebitAccount" 
                            label="Debit Account" 
                            variant="outlined" 
                            required
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtCurrency" 
                            label="Currency" 
                            variant="outlined" 
                            disabled
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtDebitAmt" 
                            label="Debit Amt" 
                            variant="outlined"  
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtCust Bal" 
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
                        <DatePicker_Custom props1="Value Date" props2="30" props3="YES" />
                    </div>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                    >
                        <h3>Credit Information</h3>
                    </div>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                    >
                        <TextField 
                            id="txtCustomer" 
                            label="Customer" 
                            variant="outlined" 
                            disabled
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtCreditAccount" 
                            label="Credit Account" 
                            variant="outlined" 
                            required
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtCurrency" 
                            label="Currency" 
                            variant="outlined" 
                            disabled
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtDealRate" 
                            label="Deal Rate" 
                            variant="outlined"  
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <TextField 
                            id="txtAmtCreditForCust" 
                            label="Amt Credit For Cust" 
                            variant="outlined" 
                            disabled
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                        <DatePicker_Custom props1="Value Date" props2="30" props3="YES" />
                    </div>
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
                            variant="outlined" 
                            sx={{marginRight: "30px",marginBottom: "20px" }}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default TransferWithdrawal