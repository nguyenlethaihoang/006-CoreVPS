import { Accordion, AccordionDetails, AccordionSummary, Button, Input, OutlinedInput, Typography } from "@mui/material"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextField_Custom from '../../../components/TextField_Custom'             
import Button_Custom from "../../../components/Button_Custom";
import UploadButton_Custom from "../../../components/UploadButton_Custom";
import { Box } from "@mui/system";

function Amend() {
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
                    {/* <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                        }}
                    >
                        <TextField_Custom props1="Customer ID" props2="30" props3="NO"/>
                    </div>

                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "20px",
                            paddingBottom: "10px",
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
                            New signature:
                        </Typography>
                        <UploadButton_Custom props1="Select signature image" props2="10" props3="YES"/>
                    </div>

                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingBottom: "20px",
                        }}
                    >
                        Old signature
                    </div>

                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingBottom: "20px",
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                            height: 233,
                            width: 350,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                        />
                    </div> */}

                    {/* <div
                        style={{ 
                            // display: "flex", 
                            width: "100%", 
                            // backgroundColor: "#333", 
                            // flexWrap: "wrap"
                        }}
                    >
                        <Button_Custom props1="Search"/> 
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
                                    Change
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

export default Amend;