import { Accordion, AccordionDetails, AccordionSummary, Button, Input, OutlinedInput, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextField_Custom from '../../../components/TextField_Custom'             
import Button_Custom from "../../../components/Button_Custom";
import UploadButton_Custom from "../../../components/UploadButton_Custom";
import axios from "axios";
import { Paid } from "@mui/icons-material";

function Capture() {
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
                    {/* <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                    >
                        <TextField_Custom props1="Customer ID" props2="30" props3="YES"/>
                    </div> */}
                    
                    {/* <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                        }}
                    >
                        <Typography
                            variant="h6" 
                            align="center" 
                            alignContent="center"
                            color="#0a3060"
                            fontWeight= "550"
                            paddingRight="30px"
                        >
                            Signature:
                        </Typography>
                        <Button 
                            variant="outlined"
                            component="label"
                            size='large'
                        >
                            Select signature image
                            <input hidden accept="image/*" multiple type="file" id="imageInput"/>
                        </Button>
                    </div> */}
                                                {/* <UploadButton_Custom props1="Select signature image" props2="10" props3="YES"/> */}


                    {/* <div
                        style={{ 
                            // display: "flex", 
                            width: "100%", 
                            // backgroundColor: "#333", 
                            // flexWrap: "wrap"
                        }}
                    >
                        <Button
                            variant="contained"
                            type={'submit'}
                            onClick={() => {
                                // console.log(document.getElementById('imageInput').value)
                                const fetchDataGetAll = async () => {
                                    await axios.post('https://cb-be.azurewebsites.net/signature/upload', {
                                        customerID: document.getElementById('txtCustomerID').value,
                                        image: document.getElementById('imageInput').value

                                    },{
                                        headers: {
                                            "content-type": "multipart/form-data",
                                        }
                                    }).then(response => {
                                        console.log("response")
                                        console.log(response)
                                         
                                    })
                                    
                                };
                                fetchDataGetAll();
                            }}
                        >
                            Save
                        </Button>
                    </div> */}
                    
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            // backgroundColor: "#333", 
                            flexWrap: "wrap"
                        
                        }}
                    >
                        <form method="post" action="https://cb-be.azurewebsites.net/signature/upload" enctype="multipart/form-data">
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
                                >
                                    Upload
                                </Button>
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