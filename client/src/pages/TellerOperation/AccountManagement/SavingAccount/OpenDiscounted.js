import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; 
import Select_Custom from "../../../../components/Select_Custom";
import { useEffect, useRef, useState } from "react";
import TextField_Custom from "../../../../components/TextField_Custom";
import TextField_Value_Custom_No_Data from "../../../../components/TextField_Value_Custom_No_Data";
import DatePicker_Custom from "../../../../components/DatePicker_Custom";
import Popup_Custom from "../../../../components/Popup_Custom";
import Popup_Custom_Fail from "../../../../components/Popup_Custom_Fail";
import Notification_Custom from "../../../../components/Notification_Custom";
import axios from "axios";
 
const categoryData = [{id: 1, Name: "3000 - Tiền  gửi thanh toán" },{id: 2, Name: "3001 - Tiết kiệm không kỳ hạn"},]
const productData = [{id: 1, Name: "Traditional FD - Arrers - Ind" },{id: 2, Name: "Arrer- Tuần năng động"}, {id: 3, Name: "Term Deposit - Arrers - Org"}]
const rollData = [{id: 1, Name: "Yes"}, {id: 2, Name: "No"}]
const currencyData = [{id: 1,Name: 'EUR' },{id: 2,Name: 'USD'},{id: 3,Name: 'GBP'},{id: 4,Name: 'JPY'},{id: 5,Name: 'VND'},]


const productLineData = [{id: 1, Name: "5001 - Tiết kiệm lãi trả trước" }]

let arr = []

let arrType = []

arrType[1] = 100000;
arrType[2] = 300000;

let arrSearchCustomer = []


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

function checkNameCustomerID(a, b) {
    let temp = null
    b.replace("10000","")
    b.replace("20000","")
    b.replace("30000","")
    a.map((data, index) => {
        // console.log("b")
        // console.log(b)
        // console.log("data.GB_FullName")
        // console.log(data.GB_FullName)
        if (b.includes(data.customer.GB_FullName))
        {
            temp = data.customer.id.toString()
            
        }
    })
    return temp
}

let bioCustomerTemp;


function OpenDiscounted() {
    const [buttonPopup, setButtonPopup] = useState(false) 
    const [buttonPopupFail, setButtonPopupFail] = useState(false)
    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)

    const [bioCustomer, setBioCustomer] = useState([]);
    useEffect(() => {
        const fetchDataCustomer = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/customer/get_all_customer`);
            const data = await response.json();
            // createSearchCustomer(data.data.customer)
            arrSearchCustomer = []
            bioCustomerTemp.map((dataMap, i) => {
                let resObj = {
                    index: i,
                    id: dataMap.customer.id,
                    label: `${dataMap.customer.id+arrType[dataMap.customer.CustomerType]} - ${dataMap.customer.GB_FullName}`

                }
                arrSearchCustomer.push(resObj)
            })
            bioCustomerTemp = data.data.customer
            setBioCustomer(data.data.customer);  
        };
        fetchDataCustomer();
    }, []);


    const [bioTerm, setBioTerm] = useState([]);
    useEffect(() => {
        const fetchDataTerm = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_saving_term`);
            const data = await response.json();
            setBioTerm(data.rows);  
        };
        fetchDataTerm();
    }, []);

    const [bioCurrency, setBioCurrency] = useState([]);
    useEffect(() => {
        const fetchDataCurrency = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_currency`);
            const data = await response.json();
            setBioCurrency(data.rows);  
        };
        fetchDataCurrency();
    }, []);
    const [bioProductLine, setBioProductLine] = useState([]);
    useEffect(() => {
        const fetchDataCustomer = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_product_line`);
            const data = await response.json();
            setBioProductLine(data.rows);  
        };
        fetchDataCustomer();
    }, []);
    const [bioRelationCode, setBioRelationCode] = useState([]);
    useEffect(() => {
        const fetchDataRelationCode = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_relation`);
            const data = await response.json();
            setBioRelationCode(data.rows);  
        };
        fetchDataRelationCode();
    }, []);
    const [bioAccountOfficer, setBioAccountOfficer] = useState([]);
    useEffect(() => {
        const fetchDataAccountOfficer = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_account_officer`);
            const data = await response.json();
            setBioAccountOfficer(data.rows);  
        };
        fetchDataAccountOfficer();
    }, []);
    let bioCustomerTemp = bioCustomer
    arrSearchCustomer = []
    bioCustomerTemp.map((dataMap, i) => {
        let resObj = {
            index: i,
            id: dataMap.customer.id,
            label: `${dataMap.customer.id+arrType[dataMap.customer.CustomerType]} - ${dataMap.customer.GB_FullName}`

        }
        arrSearchCustomer.push(resObj)

    })
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
                        2.3 Open Discounted
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingLeft: "30px"}}>
                    <div
                            style={{ 
                                display: "flex", 
                                width: "100%", 
                                paddingBottom: "20px",
                                flexWrap: "wrap"

                            }}
                    >
                        <Autocomplete
                                disablePortal
                                id="sltWorkingAccount*"
                                options={arrSearchCustomer}
                                sx={{ 
                                    width: 400,
                                    paddingBottom: "25px",
                                    paddingRight: "25px"
                                }}
                                renderInput={(params) => <TextField {...params} label="Working Account" />}
                        />
                        {/* <Select_Custom props1="Working Account*" props2="35" props3="city" props4={bioCustomer}/> */}
                        <DatePicker_Custom props1="Value Date" props2="350" props3="YES"/>
                        <TextField_Custom props1="Amount LCY*" props2="35" props3="NO"/>
                        <TextField_Custom props1="Narrative" props2="35" props3="NO"/>
                        <TextField_Custom props1="Deal Rate" props2="35" props3="NO"/>
                        <TextField_Custom props1="For Teller" props2="35" props3="NO"/>
                        <Select_Custom props1="Payment Currency*" props2="35" props3="city" props4={bioCurrency}/>
                        <Select_Custom props1="Currency*" props2="35" props3="city" props4={bioCurrency}/>
                        <Select_Custom props1="Product Line*" props2="35" props3="city" props4={productLineData}/>
                        <Select_Custom props1="Term*" props2="35" props3="city" props4={bioTerm}/>
                        <Select_Custom props1="Account Officer" props2="35" props3="city" props4={bioAccountOfficer}/>
                        <TextField_Custom props1="Amount LCY Interest*" props2="35" props3="NO"/>


                    </div>
                    <div
                            style={{ 
                                display: "flex", 
                                width: "100%", 
                                paddingBottom: "20px",
                                flexWrap: "wrap"

                            }}
                    >
                         <Button 
                            sx={{ width: `40ch`, mr: `400px`, padding: ``}} 
                            variant="contained"
                            // color="success"
                            size="large"
                            // href="https://google.com"
                            onClick={() => {
                                let txtCustomerID = document.getElementById('sltWorkingAccount*').value.toString();
                                let txtPaymentCurrency = document.getElementById('sltPaymentCurrency*').innerText.toString();
                                let txtCurrency = document.getElementById('sltCurrency*').innerText.toString();
                                let txtProductLine = document.getElementById('sltProductLine*').innerText.toString();
                                let txtTerm = document.getElementById('sltTerm*').innerText.toString();
                                let txtAmountLCY = document.getElementById('txtAmountLCY*').value;
                                let txtAmountLCYInterest =  document.getElementById('txtAmountLCYInterest*').value

                                console.log("cusID")
                                console.log(checkNameCustomerID(bioCustomer,txtCustomerID))
                                console.log("amountLCY")
                                console.log(txtAmountLCY)
                                console.log("payment")
                                console.log(checkName(bioCurrency, txtPaymentCurrency))
                                console.log("curr")
                                console.log(checkName(bioCurrency, txtCurrency))
                                console.log("producline")
                                console.log(txtProductLine)
                                console.log("term")
                                console.log(checkName(bioTerm, txtTerm))
                                console.log("interest")
                                console.log(txtAmountLCYInterest)
                                axios.post('https://api-newcore.vietvictory.vn/account/saving_account/open_discounted',{
                                    customerID: checkNameCustomerID(bioCustomer,txtCustomerID),
                                    valueDate: "2022-06-24",
                                    amountLCY: txtAmountLCY,
                                    paymentCurrency: checkName(bioCurrency, txtPaymentCurrency),
                                    currency: checkName(bioCurrency, txtCurrency),
                                    // productLine: checkName(bioProductLine, txtProductLine),
                                    productLine: 1,
                                    term: checkName(bioTerm, txtTerm),
                                    amountLCYInterest: txtAmountLCYInterest

                                })
                                .then(res => {
                                    setButtonPopup(true)

                                })
                                .catch(err=>{
                                    arr = []
                                    if (txtCustomerID.length == 1 || txtCustomerID.length == 0) arr.push(`"Working Account" is Required`);
                                    if (txtPaymentCurrency.length == 1 || txtPaymentCurrency.length == 0) arr.push(`"Payment Currency" is Required`);
                                    if (txtCurrency.length == 1 || txtCurrency.length == 0) arr.push(`"Currency" is Required`);
                                    if (txtProductLine.length == 1 || txtProductLine.length == 0) arr.push(`"Product Line" is Required`);
                                    if (txtTerm.length == 1 || txtTerm.length == 0) arr.push(`"Term" is Required`);
                                    if (txtAmountLCY.length == 1 || txtAmountLCY.length == 0) arr.push(`"AmountLCY" > 0`);
                                    if (txtAmountLCYInterest.length == 1 || txtAmountLCYInterest.length == 0) arr.push(`"Amount LCY Interest" is Required`);
                                    console.log("err")
                                    console.log(err)

                                    // setButtonPopupFail(true)
                                    setButtonPopupNoti(true)
                                    
                                    
                                })
                            }
                             
                        }
                        >
                            SAVE
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

export default OpenDiscounted