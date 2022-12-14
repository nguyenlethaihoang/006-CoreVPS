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
 
const categoryData = [{id: 1, Name: "3000 - Tiền gửi tiết kiệm" },{id: 2, Name: "3001 - Tiết kiệm không kỳ hạn"},]
const productData = [{id: 1, Name: "Traditional FD - Arrers - Ind" },{id: 2, Name: "Arrer- Tuần năng động"}, {id: 3, Name: "Term Deposit - Arrers - Org"}]
const rollData = [{id: 1, Name: "Yes"}, {id: 2, Name: "No"}]

let arr = []
let arrSearchCustomer = []

function addMonths(number, date = new Date()){
    date.setMonth(date.getMonth() + number)
    return date
}

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

function calculateMaturityDate(valueDate, term){

    let date = new Date(valueDate)
    console.log(date)
    

    const months = term.getDataValue('Value')
    const maturityDate = addMonths(months, date)

    return maturityDate
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


let arrType = []

arrType[1] = 100000;
arrType[2] = 300000;
function OpenArrear() {

    const [buttonPopup, setButtonPopup] = useState(false) 
    const [buttonPopupFail, setButtonPopupFail] = useState(false)
    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)



    // const [bioCustomer, setBioCustomer] = useState([]);
    // useEffect(() => {
    //     const fetchDataCustomer = async () => {
    //         const response = await fetch(`https://api-newcore.vietvictory.vn/customer/get_all_customer`);
    //         const data = await response.json();
    //         arrSearchCustomer = []

    //         customerArray.map((dataMap, i) => {
    //             let resObj = {
    //                 index: i,
    //                 id: dataMap.id,
    //                 label: `${dataMap.customer.id} - ${dataMap.customer.GB_FullName}`
    //             }
    //             arrSearchCustomer.push(resObj)
    //         })
    //         customerArray = data.data.customer
    //         setBioCustomer(data.data.customer);  
    //     };
    //     fetchDataCustomer();
    // }, []);


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
                        2.1 Open Arrear
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingLeft: "30px"}}>
                    <div style={{ width: "100%", paddingBottom: "20px", textAlign: "center"}}>
                        <Typography
                            variant="h6" 
                            
                        >
                            DETAILS
                        </Typography>
                    </div>
                    <div
                            style={{ 
                                display: "flex", 
                                width: "100%", 
                                paddingBottom: "20px",
                                // backgroundColor: "#333", 
                                flexWrap: "wrap"
                            }}
                            onChange={() => {
                                // document.getElementById('txtCustomer_').value = document.getElementById('sltCustomerID..').textContent.toString()
                                // document.getElementById('txtCategory_').value = document.getElementById('sltCategory..').textContent.toString()
                                // document.getElementById('txtCurrency_').value = document.getElementById('sltCurrency..').textContent.toString()

                            }}
                        >
                            <Autocomplete
                                disablePortal
                                id="sltCustomerID.."
                                options={arrSearchCustomer}
                                sx={{ 
                                    width: 400,
                                    paddingBottom: "25px",
                                    paddingRight: "25px"
                                }}
                                renderInput={(params) => <TextField {...params} label="Customer ID" />}
                            />
                            {/* <Select_Custom props1="Customer ID.." props2="35" props3="city" props4={bioCustomer}/> */}
                            <Select_Custom props1="Category.." props2="35" props3="city" props4={categoryData}/>
                            <TextField_Custom props1="Account Title.." props2="35" props3="YES"/>
                            <TextField_Custom props1="Short Title.." props2="35" props3="NO"/>
                            <Select_Custom props1="Currency.." props2="15" props3="city" props4={bioCurrency}/>
                            <Select_Custom props1="Product Line.." props2="35" props3="city" props4={bioProductLine}/>



                    </div>

                    <p><b>Join Account Infomation</b></p>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "10px"
                        }}
                    >
                        <Autocomplete
                                disablePortal
                                id="sltJoinHolderID.."
                                options={arrSearchCustomer}
                                sx={{ 
                                    width: 400,
                                    paddingBottom: "25px",
                                    paddingRight: "25px"
                                }}
                                renderInput={(params) => <TextField {...params} label="Join A/c Holder" />}
                            />
                        {/* <Select_Custom props1="Joint A/c Holder" props2="35" props3="account_officer" props4={bioCustomer}/> */}
                        <Select_Custom props1="Relationship" props2="35" props3="account_officer" props4={bioRelationCode}/>
                        <TextField_Custom props1="Notes" props2="35" props3="NO"/>
                        <Select_Custom props1="Account Officer" props2="25" props3="account_officer" props4={bioAccountOfficer}/>


                        
                    </div>

                    <hr/>
                    <div style={{ width: "100%", paddingBottom: "20px", textAlign: "center"}}><Typography variant="h6" >ALL IN ONE ACCOUNT</Typography></div>
                    {/* <p><b>Customer Information</b></p>
                    <div
                            style={{ 
                                display: "flex", 
                                width: "100%", 
                                paddingBottom: "20px",
                                pointerEvents: "none",
                                opacity: "0.6",
                                // backgroundColor: "#333", 
                                flexWrap: "wrap"
                            }}
                        >
                        <TextField_Value_Custom_No_Data props1="Customer_" props2="35" props3="NO" props4="_"/>
                        <TextField_Value_Custom_No_Data props1="Category_" props2="35" props3="NO" props4="_"/>
                        <TextField_Value_Custom_No_Data props1="Currency_" props2="15" props3="NO" props4="_"/>
                            
                    </div> */}

                    <p><b>Product Information</b></p>
                    <div
                            style={{ 
                                display: "flex", 
                                width: "100%", 
                                paddingBottom: "20px",
                                flexWrap: "wrap"

                            }}
                    >
                        {/* <Autocomplete
                                disablePortal
                                id="sltProduct.."
                                options={arrSearchCustomer}
                                sx={{ 
                                    width: 400,
                                    paddingBottom: "25px",
                                    paddingRight: "25px"
                                }}
                                renderInput={(params) => <TextField {...params} label="Product" />}
                        /> */}
                        <Select_Custom props1="Product.." props2="35" props3="account_officer" props4={productData}/>
                        <TextField_Custom props1="Principal.." props2="35" props3="YES"/>
                        <DatePicker_Custom props1="Value Date.." props2="350" props3="YES"/>
                        <Select_Custom id ='sltTerm..' props1="Term.." props2="35" props3="account_officer" props4={bioTerm}/>
                        <DatePicker_Custom props1="Maturity Date.." props2="350" props3="YES"/>
                        <TextField_Custom props1="Interest Rate.." props2="35" props3="YES"/>
                        
                    </div>
                    <p><b>Payment Information</b></p>
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
                                id="sltWorikingAccount"
                                options={arrSearchCustomer}
                                sx={{ 
                                    width: 400,
                                    paddingBottom: "25px",
                                    paddingRight: "25px"
                                }}
                                renderInput={(params) => <TextField {...params} label="Woriking Account" />}
                        />
                        {/* <Select_Custom props1="Woriking Account" props2="35" props3="account_officer" props4={bioCustomer}/>                         */}
                        <Select_Custom props1="Rollover PR only?" props2="18" props3="account_officer" props4={rollData}/>                        
                    </div>
                    <hr/>
                    <div style={{ width: "100%", paddingBottom: "20px", textAlign: "center"}}><Typography variant="h6" >NEW DEPOSIT - TERM SAVINGS</Typography></div>
                    <div
                            style={{ 
                                display: "flex", 
                                width: "100%", 
                                paddingBottom: "20px",
                                flexWrap: "wrap"

                            }}
                    >
                        <TextField_Custom props1="Acct No" props2="35" props3="NO"/>
                        <TextField_Custom props1="Payment No" props2="35" props3="NO"/>
                        <Select_Custom props1="Payment CCY" props2="18" props3="account_officer" props4={bioCurrency}/>
                        <TextField_Custom props1="For Teller" props2="35" props3="NO"/>
                        <Select_Custom props1="Debit Account" props2="18" props3="account_officer" props4={bioCurrency}/>
                        <TextField_Custom props1="Narative" props2="35" props3="NO"/>

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
                                let txtCustomerID = document.getElementById('sltCustomerID..').value.toString();
                                let txtCategory = document.getElementById('sltCategory..').innerText.toString();
                                let txtCurrency = document.getElementById('sltCurrency..').innerText.toString();
                                let txtProduct = document.getElementById('sltProduct..').innerText.toString();
                                let txtTerm = document.getElementById('sltTerm..').innerText.toString();
                                let txtAccountTitle = document.getElementById('txtAccountTitle..').value;
                                let txtValueDate = document.getElementById('dpValueDate..').value.toString();

                                let txtPrincipal =  document.getElementById('txtPrincipal..').value

                                axios.post('https://api-newcore.vietvictory.vn/account/saving_account/open_arrear',{
                                    customerID: checkNameCustomerID(bioCustomer,txtCustomerID),
                                    category: checkName(categoryData,txtCategory),
                                    currency: checkName(bioCurrency, txtCurrency),
                                    product: "product",
                                    term: checkName(bioTerm, txtTerm),
                                    valueDate: txtValueDate,
                                    accountTitle: txtAccountTitle,
                                    // principalAmount: document.getElementById('txtPrincipal..').value.toString(),
                                    principalAmount: txtPrincipal,

                                })
                                .then(res => {
                                    // document.getElementById('sltCustomerID..').textContent= null;
                                    // document.getElementById('sltCategory..').textContent= null;
                                    // document.getElementById('sltCurrency..').textContent= null;
                                    // document.getElementById('sltProductLine..').textContent= null;
                                    // document.getElementById('sltJoinA/cHolder').textContent= null;
                                    // document.getElementById('sltRelationship').textContent= null;
                                    // document.getElementById('sltAccountOfficer').textContent= null;
                                    // document.getElementById('sltProduct..').textContent= null;
                                    // document.getElementById('sltTerm..').textContent= null;
                                    // document.getElementById('sltWorkingAccount').textContent= null;
                                    // document.getElementById('sltPaymentCCY').textContent= null;
                                    // document.getElementById('sltDebitAccount').textContent= null;

                                    // document.getElementById('txtAccountTitle..').value= null;
                                    // document.getElementById('txtShortTitle..').value= null;
                                    // document.getElementById('txtNotes..').value= null;
                                    // document.getElementById('txtPrincipal..').value= null;
                                    // document.getElementById('txtInterestRate..').value= null;
                                    // document.getElementById('txtAcctNo').value= null;
                                    // document.getElementById('txtPaymentNo').value= null;
                                    // document.getElementById('txtForTeller').value= null;
                                    // document.getElementById('txtNarative').value= null;

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

export default OpenArrear