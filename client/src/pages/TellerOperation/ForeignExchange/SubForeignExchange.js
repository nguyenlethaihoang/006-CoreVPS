import { Accordion, AccordionDetails, AccordionSummary, appBarClasses, Button, Divider, fabClasses, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField_Custom from "../../../components/TextField_Custom";
import Select_Custom from "../../../components/Select_Custom";
import axios from "axios";
import Popup_Custom from "../../../components/Popup_Custom";
import Popup_Custom_Fail from "../../../components/Popup_Custom_Fail";
import Notification_Custom from "../../../components/Notification_Custom";
import { useEffect, useState } from "react";                                                                                                            

const currencyData = [{id: 1,Name: 'AUD' },{id: 2,Name: 'CAD'},{id: 3,Name: 'CNY'},{id: 4,Name: 'EUR'},{id: 5,Name: 'GBP'},{id: 6,Name: 'GOLD'},{id: 7,Name: 'HKD'},{id: 8,Name: 'JPY'},{id: 9,Name: 'NZD'},{id: 10,Name: 'SGD'},{id: 11,Name: 'USD'}, {id: 12,Name: 'VND'},]

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

    const [bioAccountOfficer, setBioAccountOfficer] = useState([]);
    useEffect(() => {
        const fetchDataAccountOfficer = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_account_officer`);
            const data = await response.json();
            setBioAccountOfficer(data.rows);  
        };
        fetchDataAccountOfficer();
    }, []);


    const debitAmtLCYElement = document.getElementById('txtDebitAmountFCY')
    console.log("Debit Amount LCY ELement: ", debitAmtLCYElement)
    const debitAmtFCYElement = document.getElementById('txtDebitAmountLCY')
    console.log("Debit Amount FCY ELement: ", debitAmtFCYElement)
    const debitDealRateElement = document.getElementById('txtDebitDealRate')
    const creditDealRateElement = document.getElementById('txtCreditDealRate')


    const [age, setAge] = useState('');
    const [debitDisable, setDebitDisable] = useState(true);
    const [creditDisable, setCreditDisable] = useState(true);
    const [debitAmt, setDebitAmt] = useState(null);
    const [creditAmt, setCreditAmt] = useState(null);
    const [labelFCY, setLabelFCY] = useState('Debit Amount FCY')
    const [labelLCY, setLabelLCY] = useState('Debit Amount LCY')
    const handleChange = (event) => {
        setAge(event.target.value);

        setDebitDisable(true)
        setCreditDisable(true)
        setDebitAmt(null)
        setCreditAmt(null)
        debitAmtFCYElement.value = null
        debitAmtLCYElement.value = null
        debitDealRateElement.value = null
        creditDealRateElement.value = null
        if(event.target.value == 12){
            
            setDebitDisable(false)
            setCreditDisable(true)
            
        }else{
            setDebitDisable(true)
            setCreditDisable(false)
        }
      };



    let a = "Debit Currency"
    let b = "Debit Account"
    let dealRate = null
    let paidAmount = null

    function setPaidAmount_Amt(event) {
        paidAmount = event.target.value
        if(paidAmount && age){
            console.log("age")
            console.log(age)
            if(age == "12" || age == 12 ){
                console.log("VNDDD")
                dealRate = document.getElementById('txtDebitDealRate').value
                if(dealRate){
                    setCreditAmt(parseFloat(paidAmount / dealRate))
                    setLabelFCY(null)
                    setLabelLCY('Debit Amount LCY')
                }
            }else{
                dealRate = document.getElementById('txtCreditDealRate').value
                console.log("FLCCC")
                if(dealRate){
                    setDebitAmt(parseFloat(paidAmount * dealRate))
                    setLabelFCY('Debit Amount FCY')
                    setLabelLCY(null)
                }
                
            }
        }
    }
    function setDealRate(event){
        dealRate = event.target.value

        if(dealRate && age){
            console.log("age")
            console.log(age)
            if(age == "12" || age == 12 ){
                console.log("VNDDD")
                paidAmount = document.getElementById('txtDebitAmountLCY').value
                if(paidAmount){
                    setCreditAmt(parseFloat(paidAmount / dealRate))
                    setLabelFCY(null)
                    setLabelLCY('Debit Amount LCY')
                }
            }else{
                paidAmount = document.getElementById('txtDebitAmountFCY').value
                console.log("FLCCC")
                if(paidAmount){
                    setDebitAmt(parseFloat(paidAmount * dealRate))
                    setLabelFCY('Debit Amount FCY')
                    setLabelLCY(null)
                }
                
            }
        }
    }
    
    

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
                        <Select_Custom props1="Teller ID*" props2="30" props3="YES" props4={bioAccountOfficer}/>
                        {/* <TextField_Custom props1="Teller ID*" props2="25" props3="NO" /> */}
                        {/* <Select_Custom props1="Debit Currency" props2="20" props3="YES" props4={currencyData}/> */}
                        {/* <Select_Custom props1="Debit Account" props2="25" props3="YES" props4={debitAccountData}/> */}
                        <div
                             style={{ 
                                marginRight: "30px",
                                marginBottom: "20px"
    
                            }}
                        >
                            <FormControl sx={{ m: 0, minWidth: "20ch" }}>
                                <InputLabel id="idlblDebitCurrency">{a}</InputLabel>
                                <Select
                                    labelId="idlblDebitCurrency"
                                    id="sltDebitCurrency"
                                    value={age}
                                    onChange={handleChange}
                                    label={a}
                                    >
                                        <MenuItem value={0}>
                                            <em>None</em>
                                        </MenuItem> 
                                        <MenuItem value={1}>AUD</MenuItem>
                                        <MenuItem value={2}>CAD</MenuItem>
                                        <MenuItem value={3}>CNY</MenuItem>
                                        <MenuItem value={4}>EUR</MenuItem>
                                        <MenuItem value={5}>GBP</MenuItem>
                                        <MenuItem value={6}>GOLD</MenuItem>
                                        <MenuItem value={7}>HKD</MenuItem>
                                        <MenuItem value={8}>JPY</MenuItem>
                                        <MenuItem value={9}>NZD</MenuItem>
                                        <MenuItem value={10}>SGD</MenuItem>
                                        <MenuItem value={11}>USD</MenuItem>
                                        <MenuItem value={12}>VND</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div
                            style={{ 
                                marginRight: "30px",
                                marginBottom: "20px" 
    
                            }}
                        >
                            <FormControl sx={{ m: 0, minWidth: "20ch" }}>
                                    <InputLabel id="idlblDebitAccount">{b}</InputLabel>
                                    <Select
                                        labelId="idlblDebitAccount"
                                        label={b}
                                        id="sltDebitAccount"
                                        value={age}
                                        onChange={handleChange}
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>AUD - 1001-1127-2002</MenuItem>
                                        <MenuItem value={2}>CAD - 1001-1133-2002</MenuItem>
                                        <MenuItem value={3}>CNY - 1001-1128-2002</MenuItem>
                                        <MenuItem value={4}>EUR - 1001-1122-2002</MenuItem>
                                        <MenuItem value={5}>GBP - 1001-1129-2002</MenuItem>
                                        <MenuItem value={6}>GOLD</MenuItem>
                                        <MenuItem value={7}>HKD - 1001-1130-2002</MenuItem>
                                        <MenuItem value={8}>JPY - 1001-1124-2002</MenuItem>
                                        <MenuItem value={9}>NZD - 1001-1131-2002</MenuItem>
                                        <MenuItem value={10}>SGD - 1001-1132-2002</MenuItem>
                                        <MenuItem value={11}>USD - 1001-1125-2002</MenuItem>
                                        <MenuItem value={12}>VND - 1001-1126-2002</MenuItem>
                                    </Select>
                                </FormControl>
                        </div>
                        <TextField 
                            sx={{
                                width: `25ch`,
                                marginRight: "20px",
                                marginBottom: "20px" 
                            }}
                            id = "txtDebitAmountLCY"
                            label = {labelLCY}
                            variant="outlined"
                            value={debitAmt}
                            onChange={setPaidAmount_Amt}
                            disabled = {debitDisable}
                            
                        />
                        <TextField 
                            sx={{
                                width: `25ch`,
                                marginRight: "20px",
                                marginBottom: "20px" 
                            }}
                            id = "txtDebitAmountFCY"
                            label = {labelFCY}
                            variant="outlined"
                            value={creditAmt}
                            onChange={setPaidAmount_Amt}
                            disabled = {creditDisable}
                        />

                        

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
                        <Select_Custom props1="Teller ID" props2="30" props3="YES" props4={bioAccountOfficer}/>
                        {/* <TextField_Custom props1="Teller ID" props2="25" props3="NO" /> */}
                        <Select_Custom props1="Credit Account" props2="25" props3="YES" props4={creditAccountData}/>
                        <TextField 
                            sx={{
                                width: `25ch`,
                                marginRight: "20px",
                                marginBottom: "20px" 
                            }}
                            id = "txtCreditDealRate"
                            label = "Credit Deal Rate"
                            variant="outlined"
                            onChange={setDealRate}
                            disabled = {creditDisable}
                        />
                        <TextField 
                            sx={{
                                width: `25ch`,
                                marginRight: "20px",
                                marginBottom: "20px" 
                            }}
                            id = "txtDebitDealRate"
                            label = "Debit Deal Rate"
                            variant="outlined"
                            onChange={setDealRate}
                            disabled = {debitDisable}
                        />
                    

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
                                let txtTellerID = document.getElementById('sltTellerID*').innerText.toString()

                                let txtDebitAmountFCY = document.getElementById('txtDebitAmountFCY').value
                                let txtDebitAmountLCY = document.getElementById('txtDebitAmountLCY').value
                                let txtCreditDealRate = document.getElementById('txtCreditDealRate').value
                                let txtDebitDealRate = document.getElementById('txtDebitDealRate').value
                                
                                let txtDebitCurrency = document.getElementById('sltDebitCurrency').innerText.toString()
                                let txtDebitAccount = document.getElementById('sltDebitAccount').innerText.toString()
                                let txtCurrencyPaid = document.getElementById('sltCurrencyPaid').innerText.toString()

                                console.log("sltDebitCurrency")
                                console.log(txtDebitCurrency)
                                console.log(checkName(currencyData, txtDebitCurrency))
                                console.log("sltDebitAccount")
                                console.log(txtDebitAccount)
                                console.log(checkName(currencyData, txtCurrencyPaid))


                                
                                
                                let txtCreditAccount = document.getElementById('sltCreditAccount').innerText.toString()

                                axios.post('https://api-newcore.vietvictory.vn/exchange/create',{
                                    customerName: txtCustomerName,
                                    address: txtAddress,
                                    tellerIDst: txtTellerID,
                                    debitCurrency: checkName(currencyData, txtDebitCurrency),
                                    currencyPaid: checkName(currencyData, txtCurrencyPaid),
                                    debitAmtFCY: txtDebitAmountFCY,
                                    debitAmtLCY: txtDebitAmountLCY,
                                    debitDealRate: txtDebitDealRate,
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
                                     if (txtDebitCurrency.length == 0) arr.push(`"Debit Currency" is Required`);
                                     if (txtDebitCurrency == 'VND'){
                                        if(!txtDebitAmountLCY){
                                            arr.push(`"Debit Amount LCY" is required`)
                                        }
                                        if(!txtDebitDealRate){
                                            arr.push(`"Debit Deal Rate" is required`)
                                        }
                                     }else{
                                        if(!txtDebitAmountFCY){
                                            arr.push(`"Debit Amount FCY" is required`)
                                        }
                                        if(!txtCreditDealRate){
                                            arr.push(`"Credit Deal Rate" is required`)
                                        }
                                     }
                                     if (txtCurrencyPaid.length == 1 || txtCurrencyPaid.length == 0) arr.push(`"Currency Paid" is Required`);
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