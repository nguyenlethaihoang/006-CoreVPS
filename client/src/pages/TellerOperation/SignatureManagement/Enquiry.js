import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Enquiry.css"

import TextField_Custom from '../../../components/TextField_Custom'             
import Button_Custom from "../../../components/Button_Custom";
import { useState } from "react";
import axios from "axios";
import TextField_Value_Custom from "../../../components/TextField_Value_Custom";
import Notification_Custom from "../../../components/Notification_Custom";


let arr = []

function Enquiry() {
    const [valueImage, setValueImage] = useState("")
    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)
    return(
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
                        2. Enquiry
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
                        <TextField_Custom props1="Doc ID / Tax Identification Number" props2="40" props3="NO"/>
                        <TextField_Value_Custom props1="Customer Name" props2="30" props3="NO" props4="_"/>
                    </div>

                    <div
                        style={{ 
                            // display: "flex", 
                            width: "100%", 
                            // backgroundColor: "#333", 
                            // flexWrap: "wrap"
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => {
                                const fetchDataGetAll = async () => { 
                                    let valueId = document.getElementById('txtDocID/TaxIdentificationNumber').value
                                    await axios.get(`https://api-newcore.vietvictory.vn/signature/get_by_customer/${valueId}`, {
                                    }).then(response => {
                                        if (response.data.data.signature[0].URL != undefined ) {
                                            setValueImage(response.data.data.signature[0].URL)
                                            document.getElementById('txtCustomerName').value = response.data.data.customer.GB_FullName.toString()
                                        }
                                         
                                    })
                                    .catch(err=>{
                                        console.log("err")
                                        console.log(err)
                                        arr = []
                                        document.getElementById('txtCustomerName').value = ""
                                        arr.push("Customer has no signature")
                                        setButtonPopupNoti(true)
                                    })
                                    
                                };
                                fetchDataGetAll();
                            }}
                        >
                            Search
                        </Button>
                        <Notification_Custom
                            trigger={buttonPopupNoti}
                            setTrigger={setButtonPopupNoti}
                            arr={arr}
                        >

                    </Notification_Custom>
                    </div>
                    <div
                        style={{ 
                            // display: "flex", 
                            width: "100%", 
                            // backgroundColor: "#333", 
                            // flexWrap: "wrap"
                        }}
                    >
                        <img 
                            className = "imgEnquirySignature"
                            src={valueImage}
                            style={{
                                paddingTop: "20px"
                            }}
                        />
                    </div>


                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Enquiry;