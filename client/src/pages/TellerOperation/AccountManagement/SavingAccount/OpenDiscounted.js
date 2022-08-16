import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
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

function checkNameCustomerID(a, b) {
    let temp = null
    a.map((data, index) => {
        if (b.includes(data.GB_FullName))
        {
            temp = data.id.toString()
            
        }
    })
    return temp
}

function OpenDiscounted() {
    const [buttonPopup, setButtonPopup] = useState(false) 
    const [buttonPopupFail, setButtonPopupFail] = useState(false)
    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)

    const [bioCustomer, setBioCustomer] = useState([]);
    useEffect(() => {
        const fetchDataCustomer = async () => {
            const response = await fetch(`https://cb-be.azurewebsites.net/customer/get_all_customer`);
            const data = await response.json();
            setBioCustomer(data.data.customer);  
        };
        fetchDataCustomer();
    }, []);

    const [bioTerm, setBioTerm] = useState([]);
    useEffect(() => {
        const fetchDataTerm = async () => {
            const response = await fetch(`https://cb-be.azurewebsites.net/storage/get_saving_term`);
            const data = await response.json();
            setBioTerm(data.rows);  
        };
        fetchDataTerm();
    }, []);

    const [bioCurrency, setBioCurrency] = useState([]);
    useEffect(() => {
        const fetchDataCurrency = async () => {
            const response = await fetch(`https://cb-be.azurewebsites.net/storage/get_currency`);
            const data = await response.json();
            setBioCurrency(data.rows);  
        };
        fetchDataCurrency();
    }, []);
    const [bioProductLine, setBioProductLine] = useState([]);
    useEffect(() => {
        const fetchDataCustomer = async () => {
            const response = await fetch(`https://cb-be.azurewebsites.net/storage/get_product_line`);
            const data = await response.json();
            setBioProductLine(data.rows);  
        };
        fetchDataCustomer();
    }, []);
    const [bioRelationCode, setBioRelationCode] = useState([]);
    useEffect(() => {
        const fetchDataRelationCode = async () => {
            const response = await fetch(`https://cb-be.azurewebsites.net/storage/get_relation`);
            const data = await response.json();
            setBioRelationCode(data.rows);  
        };
        fetchDataRelationCode();
    }, []);
    const [bioAccountOfficer, setBioAccountOfficer] = useState([]);
    useEffect(() => {
        const fetchDataAccountOfficer = async () => {
            const response = await fetch(`https://cb-be.azurewebsites.net/storage/get_account_officer`);
            const data = await response.json();
            setBioAccountOfficer(data.rows);  
        };
        fetchDataAccountOfficer();
    }, []);
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
                        <Select_Custom props1="Working account" props2="35" props3="city" props4={bioCustomer}/>
                        <DatePicker_Custom props1="Value Date" props2="350" props3="YES"/>
                        <TextField_Custom props1="Amount LCY" props2="35" props3="NO"/>
                        <TextField_Custom props1="Amount FCY" props2="35" props3="NO"/>
                        <Select_Custom props1="Payment CCY" props2="35" props3="city" props4={bioCurrency}/>
                        <Select_Custom props1="Product Line" props2="35" props3="city" props4={bioProductLine}/>
                        <Select_Custom props1="Currency" props2="35" props3="city" props4={bioCurrency}/>
                        <Select_Custom props1="Term" props2="35" props3="city" props4={bioTerm}/>
                        <TextField_Custom props1="Amount LCY Interest" props2="35" props3="NO"/>


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
                                let txtCustomerID = document.getElementById('sltCustomerID..').innerText.toString();
                                let txtCategory = document.getElementById('sltCategory..').innerText.toString();
                                let txtCurrency = document.getElementById('sltCurrency..').innerText.toString();
                                let txtProduct = document.getElementById('sltProduct..').innerText.toString();
                                let txtTerm = document.getElementById('sltTerm..').innerText.toString();
                                let txtAccountTitle = document.getElementById('txtAccountTitle..').value;

                                let txtPrincipal =  document.getElementById('txtPrincipal..').value

                                axios.post('https://cb-be.azurewebsites.net/account/saving_account/open_arrear',{
                                    customerID: checkNameCustomerID(bioCustomer,txtCustomerID),
                                    category: 1,
                                    currency: checkName(bioCurrency, txtCurrency),
                                    product: "product",
                                    term: checkName(bioTerm, txtTerm),

                                    accountTitle: txtAccountTitle,
                                    // principalAmount: document.getElementById('txtPrincipal..').value.toString(),
                                    principalAmount: txtPrincipal,

                                })
                                .then(res => {
                                    setButtonPopup(true)

                                })
                                .catch(err=>{
                                    arr = []
                                    if (txtCustomerID.length == 1 || txtCustomerID.length == 0) arr.push(`"Customer ID" is Required`);
                                    if (txtCategory.length == 1 || txtCategory.length == 0) arr.push(`"Category" is Required`);
                                    // if (txtProduct.length == 1 || txtProduct.length == 0) arr.push(`"Product" is Required`);
                                    if (txtCurrency.length == 1 || txtCurrency.length == 0) arr.push(`"Currency" is Required`);
                                    if (txtTerm.length == 1 || txtTerm.length == 0) arr.push(`"Term" is Required`);
                                    if (txtPrincipal.length == 1 || txtPrincipal.length == 0) arr.push(`"Principal" > 0`);
                                    if (txtAccountTitle.length == 1 || txtAccountTitle.length == 0) arr.push(`"Account Title" is Required`);
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