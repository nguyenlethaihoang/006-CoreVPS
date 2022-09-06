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

const categoryData = [
    {id: 1,
    Name: '1000 - Tiền  gửi thanh toán' },
    {
    id: 2,
    Name: '2000 - Tiết kiệm không kỳ hạn'},
]

const currencyData = [{id: 1,Name: 'EUR' },{id: 2,Name: 'USD'},{id: 3,Name: 'GBP'},{id: 4,Name: 'JPY'},{id: 5,Name: 'VND'},]

let arr = []

let arrSearchCustomer = [

]

function checkName(a, b) {
    let temp = null
    a.map((data, index) => {
        if (data.Name == b)
        {
            temp = data.id.toString()
            
        }
    })
    return temp
}

function checkNameCustomerID(a, b) {
    let temp = null
    a.map((data, index) => {
        // console.log("b")
        // console.log(b)
        // console.log("data.GB_FullName")
        // console.log(data.GB_FullName)
        if (b.includes(data.GB_FullName))
        {
            temp = data.id.toString()
            
        }
    })
    return temp
}
function OpenAccount() {

    const [buttonPopup, setButtonPopup] = useState(false) 
    const [buttonPopupFail, setButtonPopupFail] = useState(false)
    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)

    const [nameField, setNameField] = useState(false)

    const [bioCustomer, setBioCustomer] = useState([]);
    useEffect(() => {
        const fetchDataCustomer = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/customer/get_all_customer`);
            const data = await response.json();
            // console.log("data")
            // console.log(data.data.customer)
            // createSearchCustomer(data.data.customer)
            arrSearchCustomer = []
            
            bioCustomer.map((dataMap, i) => {
                let resObj = {
                    index: i,
                    id: dataMap.id,
                    label: `${dataMap.id} - ${dataMap.GB_FullName}`
                }
                arrSearchCustomer.push(resObj)
            })
            setBioCustomer(data.data.customer);  
        };
        fetchDataCustomer();
    }, []);

    const [bioRelationCode, setBioRelationCode] = useState([]);
    useEffect(() => {
        const fetchDataRelationCode = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_relation`);
            const data = await response.json();
            // console.log("relation")
            // console.log(data.rows)
            setBioRelationCode(data.rows);  
        };
        fetchDataRelationCode();
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

    const [bioChargeCode, setBioChargeCode] = useState([]);
    useEffect(() => {
        const fetchDataCustomer = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_charge_code`);
            const data = await response.json();
            setBioChargeCode(data.rows);  
        };
        fetchDataCustomer();
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

    let temp = bioCustomer
    arrSearchCustomer = []
            bioCustomer.map((dataMap, i) => {
                let resObj = {
                    index: i,
                    id: dataMap.id,
                    label: `${dataMap.id} - ${dataMap.GB_FullName}`
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
                        1.1 Open Account
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
                        
                        <Autocomplete
                            disablePortal
                            id="sltCustomerID"
                            options={arrSearchCustomer}
                            sx={{ 
                                width: 400,
                                paddingBottom: "25px",
                                paddingRight: "25px"
                            }}
                            renderInput={(params) => <TextField {...params} label="Customer ID" />}
                        />
                        {/* <Select_Custom props1="Customer ID" props2="35" props3="city" props4={bioCustomer}/> */}
                        <Select_Custom props1="Category" props2="35" props3="city" props4={categoryData}/>
                        <Select_Custom props1="Product Line" props2="35" props3="city" props4={bioProductLine}/>
                        <Select_Custom props1="Currency" props2="35" props3="city" props4={currencyData}/>
                        <TextField_Custom props1="Account Title" props2="35" props3="NO"/>
                        <TextField_Custom props1="Short Title" props2="35" props3="NO"/>
                        <Select_Custom props1="Account Officer" props2="25" props3="account_officer" props4={bioAccountOfficer}/>
                        <Select_Custom props1="Charge Code" props2="25" props3="account_officer" props4={bioChargeCode}/>
                    </div>
 
                    <hr/>
                    <p><b>JOIN HOLDER</b></p>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "10px"
                        }}
                    >
                        
                        <br/>
                        <Select_Custom props1="ID Join Holder" props2="35" props3="account_officer" props4={bioCustomer}/>
                        <Select_Custom props1="Relation Code" props2="35" props3="account_officer" props4={bioRelationCode}/>
                        <TextField_Custom props1="Join Notes" props2="35" props3="NO"/>
  
                    </div>
                    <div
                        style={{ 
                            // display: "flex", 
                            width: "100%", 
                            // backgroundColor: "#333", 
                            // flexWrap: "wrap"
                        }}
                    >
                        {/* <Button_Custom props1="Save"/>  */}
                        <Button 
                            sx={{ width: `40ch`, mr: `400px`, padding: ``}} 
                            variant="contained"
                            // color="success"
                            size="large"
                            // href="https://google.com"
                            onClick={() => {
                                let txtCustomerID = document.getElementById('sltCustomerID').value.toString();
                                console.log("temp")
                                console.log(temp)
                                let txtCategory = document.getElementById('sltCategory').textContent.toString();
                                let txtProductLine = document.getElementById('sltProductLine').textContent.toString();
                                let txtCurrency = document.getElementById('sltCurrency').textContent.toString();    
                                let txtAccountOfficer = document.getElementById('sltAccountOfficer').textContent.toString(); 
                                let txtIDJoinHolder = document.getElementById('sltIDJoinHolder').textContent.toString();
                                let txtRelationCode = document.getElementById('sltRelationCode').textContent.toString();
                                let txtChargeCode = document.getElementById('sltChargeCode').textContent.toString();

                                axios.post('https://api-newcore.vietvictory.vn/account/debit_account/open',{
                                    accountTitle: document.getElementById('txtAccountTitle').value,
                                    shortTitle: document.getElementById('txtShortTitle').value,
                                    joinNotes: document.getElementById('txtJoinNotes').value,

                                    customerID: checkNameCustomerID(bioCustomer, txtCustomerID),
                                    chargeCode: checkName(bioChargeCode, txtChargeCode),
                                    category: checkName(categoryData, txtCategory),
                                    productLine: checkName(bioProductLine, txtProductLine),
                                    currency: checkName(currencyData, txtCurrency),
                                    accountOfficer: checkName(bioAccountOfficer, txtAccountOfficer),
                                    joinHolderID: checkNameCustomerID(bioCustomer, txtIDJoinHolder),
                                    relationCode: checkName(bioRelationCode, txtRelationCode), 

                                })
                                .then(res => {
                                    // console.log("open")
                                    // console.log(res)
                                    document.getElementById('sltCategory').textContent= null;
                                    document.getElementById('sltProductLine').textContent= null;
                                    document.getElementById('sltCurrency').textContent= null;    
                                    document.getElementById('sltAccountOfficer').textContent= null; 
                                    document.getElementById('sltIDJoinHolder').textContent= null;
                                    document.getElementById('sltRelationCode').textContent= null;
                                    document.getElementById('sltChargeCode').textContent= null;
                                    document.getElementById('txtAccountTitle').value = null;
                                    document.getElementById('txtShortTitle').value = null;
                                    document.getElementById('txtJoinNotes').value = null;

                                    setButtonPopup(true)

                                })
                                .catch(err=>{
                                    arr = []
                                    if (txtCustomerID.length == 1 || txtCustomerID.length == 0) arr.push(`"Customer ID" is Required`);
                                    if (txtCategory.length == 1 || txtCategory.length == 0) arr.push(`"Category" is Required`);
                                    if (txtProductLine.length == 1 || txtProductLine.length == 0) arr.push(`"Product Line" is Required`);
                                    if (txtCurrency.length == 1 || txtCurrency.length == 0) arr.push(`"Currency" is Required`);
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
 
export default OpenAccount