import { Accordion, AccordionDetails, AccordionSummary, Button, Input, OutlinedInput, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextField_Custom from '../../../components/TextField_Custom'             
import Button_Custom from "../../../components/Button_Custom";
import UploadButton_Custom from "../../../components/UploadButton_Custom";
import axios from "axios";
import { ExitToApp, Paid } from "@mui/icons-material";
import Popup_Custom from "../../../components/Popup_Custom";
import { useState } from "react";
import Notification_Custom from "../../../components/Notification_Custom";

let check = false;

function handleSubmit() {
     const form = document.getElementById("idform");
    document.getElementById("idform").addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        axios.post("https://api-newcore.vietvictory.vn/signature/upload", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log("res1");
            console.log("xxxxxxxxxxxxxx")
            console.log(res);

        })
        .catch((err) => {
            console.log("err1");
            console.log(err);
        });
    },   {once : true});
}

let arr = []

function Capture() {
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
                        1. Capture
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
                            onSubmit={handleSubmit} 
                            enctype="multipart/form-data" 
                            id="idform">
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
                                    name="customerID"
                                    placeholder="Customer ID"

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
                                <Input 
                                    type="text" 
                                    name="description"
                                    placeholder="Description"
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
                                     accept="image/*"
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
                                    type="submit" 
                                    name="upload" 
                                    onClick={() => {
                                        const form = document.getElementById("idform");
                                        if (form.elements["customerID"].value > 300000)
                                            form.elements["customerID"].value -= 300000
                                        else if (form.elements["customerID"].value > 200000)
                                            form.elements["customerID"].value -= 200000
                                        else if (form.elements["customerID"].value > 100000)
                                            form.elements["customerID"].value -= 100000
                                        document.getElementById("idform").addEventListener("submit", (e) => {
                                            e.preventDefault();
                                            const formData = new FormData(form);
                                            axios.post("https://api-newcore.vietvictory.vn/signature/upload", formData, {
                                                headers: {
                                                "Content-Type": "multipart/form-data",
                                                },
                                            })
                                            .then((res) => {
                                                // console.log("res1");
                                                // console.log("xxxxxxxxxxxxxx")
                                                // console.log(res);
                                                if (!res.data.data) {
                                                    arr = []
                                                    arr.push(`Invalid "Customer ID"`);
                                                    setButtonPopupNoti(true)
                                                } 
                                                else {
                                                    setButtonPopup(true)
                                                    form.elements["customerID"].value = '' 
                                                }
                                                

                                            })
                                            .catch((err) => {
                                                // console.log("err1");
                                                // console.log(err);
                                                arr = []
                                                arr.push(`Provide image`);
                                                setButtonPopupNoti(true)
                                            });
                                        },   {once : true});
                                    }}
                                >
                                        Upload
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

export default Capture; 