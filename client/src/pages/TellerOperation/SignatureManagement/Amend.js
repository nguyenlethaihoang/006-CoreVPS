import { Accordion, AccordionDetails, AccordionSummary, Button, Input, OutlinedInput, Typography } from "@mui/material"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextField_Custom from '../../../components/TextField_Custom'             
import Button_Custom from "../../../components/Button_Custom";
import UploadButton_Custom from "../../../components/UploadButton_Custom";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import Popup_Custom from "../../../components/Popup_Custom";
import Notification_Custom from "../../../components/Notification_Custom";


let arr = []

let idImage;

function Amend() {
    const [valueImage, setValueImage] = useState("")
    const [buttonPopup, setButtonPopup] = useState(false)
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
                        3. Amend
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingLeft: "30px"}}>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            // backgroundColor: "#333", 
                            flexWrap: "wrap"
                        
                        }}
                    >
                        <form 
                            method="post" 
                            action="https://api-newcore.vietvictory.vn/signature/upload" 
                            enctype="multipart/form-data"
                            id="idFormAmend"
                        >
                            <div class="form-group">

                            <div
                                style={{ 
                                    display: "flex", 
                                    width: "100%", 
                                    // backgroundColor: "#333", 
                                    flexWrap: "wrap",
                                    paddingBottom: "20px"
                                }}
                            >
                                <Input 
                                
                                    type="text" 
                                    name="docID"
                                    placeholder="Doc ID / Tax Identification Number"
                                />
                            </div>
                            <div
                                style={{ 
                                    display: "flex", 
                                    width: "100%", 
                                    // backgroundColor: "#333", 
                                    flexWrap: "wrap",
                                    paddingBottom: "20px"

                                }}
                            >
                                <OutlinedInput 
                                
                                     type="file" 
                                     name="image" 
                                    //  class="input-group input-file"
                                /> 
                            </div>

                            <div
                                style={{ 
                                    display: "flex", 
                                    width: "100%", 
                                    // backgroundColor: "#333", 
                                    flexWrap: "wrap",
                                    paddingBottom: "20px"

                                }}
                            >
                                <Button 
                                    variant="contained"
                                    // type="submit 
                                    // name="upload" 
                                    onClick={() => {
                                        // const form = document.getElementById("idform").elements["docID"].value
                                        const docYeah = document.getElementById("idFormAmend").elements["docID"].value
                                        console.log("docYeah")
                                        console.log(docYeah)
                                        const fetchDataGetAll = async () => { 
                                            let valueId = docYeah
                                            await axios.get(`https://api-newcore.vietvictory.vn/signature/get_by_customer/${valueId}`, {
                                            }).then(response => {
                                                if (response.data.data.signature[0].URL != undefined ) {
                                                    // setValueImage(response.data.data.signature[0].URL)
                                                    console.log("id ne")
                                                    console.log(response.data.data.signature[0].signature.id)
                                                    idImage = response.data.data.signature[0].signature.id
                                                    const form = document.getElementById("idFormAmend")
                                                    const formData = new FormData(form);
                                                    axios.post(`https://api-newcore.vietvictory.vn/signature/change_image/${idImage}`, formData, {
                                                        headers: {
                                                        "Content-Type": "multipart/form-data",
                                                        },
                                                    })
                                                    .then((res) => {
                                                        if (!res.data.data) {
                                                            arr = []
                                                            arr.push(`Invalid "Doc ID / Tax Identification Number"`);
                                                            setButtonPopupNoti(true)
                                                        } 
                                                        else {
                                                            setButtonPopup(true)
                                                            form.elements["docID"].value = '' 
                                                        }
                                                        
                                                    })                                                 
                                                    // document.getElementById('txtCustomerName').value = response.data.data.customer.GB_FullName.toString()
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
                                        Change
                                    </Button>
                                    <Popup_Custom 
                                        trigger={buttonPopup}
                                        setTrigger={setButtonPopup}
                                    >           
                                    </Popup_Custom>
                                    <Notification_Custom
                                        trigger={buttonPopupNoti}
                                        setTrigger={setButtonPopupNoti}
                                        arr={arr}
                                    >

                                    </Notification_Custom>
                                </div>
                            </div>
                        </form>
                    </div>

                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Amend;