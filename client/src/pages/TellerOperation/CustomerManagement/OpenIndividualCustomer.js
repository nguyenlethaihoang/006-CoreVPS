import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextField_Custom from '../../../components/TextField_Custom'
import Select_Custom from "../../../components/Select_Custom";
import DatePicker_Custom from "../../../components/DatePicker_Custom";
import Button_Custom from "../../../components/Button_Custom";
import axios from "axios";
import { useEffect, useState } from "react";
import Popup_Custom from "../../../components/Popup_Custom";
import Popup_Custom_Fail from "../../../components/Popup_Custom_Fail";
import TextField_Value_Custom_No_Data from "../../../components/TextField_Value_Custom_No_Data";
import Notification_Custom from "../../../components/Notification_Custom";

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

function checkCode(a, b) {
    let temp = null
    a.map((data, index) => {
        if (data.Code == b)
        {
            temp = data.id.toString()
            
        }
    })
    return temp
}

let arr = []

function OpenIndividualCustomer() {

    const [buttonPopup, setButtonPopup] = useState(false)
    const [buttonPopupFail, setButtonPopupFail] = useState(false)
    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)

    
    const [bioCity, setBioCity] = useState([]);
    useEffect(() => {
        const fetchDataCity = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_city_province`);
            const data = await response.json();
            setBioCity(data.rows);  
        };
        fetchDataCity();
    }, []);

    const [bioCountry, setBioCountry] = useState([]);
    useEffect(() => {
        const fetchDataCountry = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_country`);
            const data = await response.json();
            setBioCountry(data.rows);  
        };
        fetchDataCountry();
    }, []);

    const [bioDoctype, setBioDoctype] = useState([]);
    useEffect(() => {
        const fetchDataDoctype = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_doctype`);
            const data = await response.json();
            setBioDoctype(data.rows);  
        };
        fetchDataDoctype();
    }, []);

    const [bioMainSector, setBioMainSector] = useState([]);
    useEffect(() => {
        const fetchDataMainSector = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_sector`);
            const data = await response.json();
            setBioMainSector(data.rows);  
        };
        fetchDataMainSector();
    }, []);

    const [bioMainIndustry, setBioMainIndustry] = useState([]);
    useEffect(() => {
        const fetchDataMainIndustry = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_industry`);
            const data = await response.json();
            setBioMainIndustry(data.rows);  
        };
        fetchDataMainIndustry();
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
                        1. Open Individual Customer
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingLeft: "30px"}}>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                        onChange={() => {
                            document.getElementById('txtGBShortName').value = document.getElementById('txtLastName').value + " " + document.getElementById('txtMiddleName').value + " " + document.getElementById('txtFirstName').value
                            document.getElementById('txtGBFullName').value = document.getElementById('txtGBShortName').value;
                        }}
                    >
                        <TextField_Custom props1="First Name" props2="22.5" props3="NO"/>
                        <TextField_Custom props1="Last Name" props2="22.5" props3="NO"/>
                        <TextField_Custom props1="Middle Name" props2="22.5" props3="NO"/>
                        <TextField_Value_Custom_No_Data props1="GB Short Name" props2="35" props3="YES" props4="_"/>
                        <TextField_Value_Custom_No_Data props1="GB Full Name" props2="35" props3="YES" props4="_"/>
                        <DatePicker_Custom props1="Birthday" props2="350" props3="YES"/>
                        <TextField_Custom props1="GB Street" props2="35" props3="YES"    />
                        <TextField_Custom props1="GB Town/Dist" props2="35" props3="YES"/>  
                        <TextField_Custom props1="Mobile Phone" props2="15" props3="NO"/>  
                        <TextField_Custom props1="Sex" props2="15" props3="NO"/>  
                        <Select_Custom props1="City/Province" props2="35" props3="city" props4={bioCity}/>
                        <Select_Custom props1="GB Country" props2="30" props3="country" props4={bioCountry}/>
                        <Select_Custom props1="Nationality" props2="30" props3="country" props4={bioCountry}/>
                        <Select_Custom props1="Residence" props2="30" props3="country" props4={bioCountry}/>
                        <Select_Custom props1="Doc Type" props2="20" props3="doctype" props4={bioDoctype}/>
                        <TextField_Custom props1="Doc ID" props2="20" props3="YES"/>
                        <DatePicker_Custom props1="Doc Issue Date" props2="350" props3="YES"/>
                        <DatePicker_Custom props1="Doc Expiry Date" props2="350" props3="YES"/>
                        <TextField_Custom props1="Email Address" props2="35" props3="NO"/>
                        <Select_Custom props1="Main Sector" props2="30" props3="main_sector" props4={bioMainSector}/> 
                        {/* <Select_Custom props1="SubSector" props2="30" props3="sub_sector" props4={bioMainSector}/> */}
                        {/* <Select_Custom props1="Main Industry" props2="30" props3="main_industry" props4={bioMainSector}/> */}
                        {/* <Select_Custom props1="Industry" props2="30" props3="sub_industry" props4={bioMainIndustry}/>  */}
                        <Select_Custom props1="Account Officer" props2="25" props3="account_officer" props4={bioAccountOfficer}/>
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
                                
                                let txtCity = document.getElementById('sltCity/Province').textContent.toString();
                                let txtCountry = document.getElementById('sltGBCountry').textContent.toString();
                                let txtNationality = document.getElementById('sltNationality').textContent.toString();
                                let txtResidence = document.getElementById('sltResidence').textContent.toString();
                                let txtDoctype = document.getElementById('sltDocType').textContent.toString();
                                let txtMainSector = document.getElementById('sltMainSector').textContent.toString();
                                // let txtMainIndustry = document.getElementById('sltMainIndustry').textContent.toString();
                                let txtAccountOfficer = document.getElementById('sltAccountOfficer').textContent.toString();

                                arr = []
                                if (document.getElementById('txtFirstName').value.length == 1 || document.getElementById('txtFirstName').value.length == 0) arr.push(`"First Name" is Required`);
                                if (document.getElementById('txtLastName').value.length == 1 || document.getElementById('txtLastName').value.length == 0) arr.push(`"Last  Name" is Required`);
                                if (document.getElementById('txtDocID').value.length == 1 || document.getElementById('txtDocID').value.length == 0) arr.push(`"Doc ID" is Required`);
                                if (document.getElementById('txtMobilePhone').value.length == 1 || document.getElementById('txtMobilePhone').value.length == 0) arr.push(`"MobilePhone" is Required`);
                                console.log("arr")
                                console.log(arr)
                                console.log(arr.length)
                                if (arr.length != 0) {
                                    setButtonPopupNoti(true)
                                    
                                }
                                else {
                                    axios.post('https://api-newcore.vietvictory.vn/customer/create_individual_customer',{
                                        firstName: document.getElementById('txtFirstName').value,
                                        lastName: document.getElementById('txtLastName').value,
                                        middleName: document.getElementById('txtMiddleName').value,
                                        GB_ShortName: document.getElementById('txtGBShortName').value,
                                        GB_FullName: document.getElementById('txtGBFullName').value,
                                        GB_Street: document.getElementById('txtGBStreet').value,
                                        GB_Towndist: document.getElementById('txtGBTown/Dist').value,
                                        mobilePhone: document.getElementById('txtMobilePhone').value,
                                        docID: document.getElementById('txtDocID').value,
                                        emailAddress: document.getElementById('txtEmailAddress').value,

                                        cityProvince: checkName(bioCity, txtCity),
                                        GB_Country: checkCode(bioCountry, txtCountry),
                                        nationality: checkCode(bioCountry, txtNationality),
                                        residence: checkCode(bioCountry, txtResidence),
                                        doctype: checkName(bioDoctype, txtDoctype),
                                        mainSector: checkName(bioMainSector, txtMainSector),
                                        // mainIndustry: checkName(bioMainIndustry, txtMainIndustry),
                                        accountOfficer: checkName(bioAccountOfficer, txtAccountOfficer),
                                    })
                                    .then(res => {  
                                        // document.getElementById('sltCityProvince').textContent = null;
                                        // document.getElementById('sltNationality').textContent = null;
                                        // document.getElementById('sltResidence').textContent = null;
                                        // document.getElementById('sltDocType').textContent = null;
                                        // document.getElementById('sltMainSector').textContent = null;
                                        // document.getElementById('sltAccountOfficer').textContent = null;
                                        
                                        // document.getElementById('txtFirstName').value = null;
                                        // document.getElementById('txtLastName').value = null;
                                        // document.getElementById('txtMiddleName>').value = null;
                                        // document.getElementById('txtGBShortName>').value = "_";
                                        // document.getElementById('txtGBFullName>').value = "_";
                                        // document.getElementById('txtGBStreet').value = null;
                                        // document.getElementById('txtGBTownDist').value = null;
                                        // document.getElementById('txtMobilePhone').value = null;
                                        // document.getElementById('txtSex').value = null;
                                        // document.getElementById('txtDocID').value = null;
                                        // document.getElementById('txtEmailAddress').value = null;



                                        setButtonPopup(true)

                                    })
                                    .catch(err=>{
                                        console.log(err)
                                        arr = []
                                        if (document.getElementById('txtGBShortName').value.length == 1 || document.getElementById('txtGBShortName').value.length == 0) arr.push(`"GB Short Name" is Required`);
                                        if (document.getElementById('txtGBFullName').value.length == 1 || document.getElementById('txtGBFullName').value.length == 0) arr.push(`"GB Full Name" is Required`);
                                        if (document.getElementById('txtGBStreet').value.length == 1 || document.getElementById('txtGBStreet').value.length == 0) arr.push(`"GB Street" is Required`);
                                        if (document.getElementById('txtGBTownDist').value.length == 1 || document.getElementById('txtGBTownDist').value.length == 0) arr.push(`"GB Town Dist" is Required`);
                                        if (document.getElementById('txtDocID').value.length == 1 || document.getElementById('txtDocID').value.length == 0) arr.push(`"Doc ID" is Required`);
                                        if (txtMainSector.length == 1 || txtMainSector.length == 0) arr.push(`"Main Sector" is Required`);
                                        
                                        setButtonPopupFail(true)
                                    })
                                }

                                
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

export default OpenIndividualCustomer;