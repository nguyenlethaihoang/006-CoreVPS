import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField_Custom from "../../../components/TextField_Custom";
import Select_Custom from "../../../components/Select_Custom";

function SubForeignExchange() {
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
                        Foreign Exchange
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
                        <TextField_Custom props1="Customer Name" props2="40" props3="YES" />
                        <TextField_Custom props1="Address" props2="40" props3="YES" />
                        <TextField_Custom props1="Phone No." props2="20" props3="NO" />

                    </div>
                    <Divider></Divider>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "20px"

                        }}
                    >
                        <TextField_Custom props1="Teller ID" props2="25" props3="YES" />
                        {/* <Select_Custom props1="Debit Currency" props2="15" props3="YES" props4={bioCity}/> */}
                        {/* <Select_Custom props1="Debit Account" props2="15" props3="YES" props4={bioCity}/> */}
                        <TextField_Custom props1="Debit Amt FCY" props2="25" props3="NO" />

                        

                    </div>
                    <Divider></Divider>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "20px"

                        }}
                    >
                        {/* <Select_Custom props1="Currency Paid" props2="15" props3="YES" props4={bioCity}/> */}
                        <TextField_Custom props1="Teller ID" props2="25" props3="NO" />
                        {/* <Select_Custom props1="Credit Account" props2="15" props3="YES" props4={bioCity}/> */}
                        <TextField_Custom props1="Credit Deal Rate" props2="25" props3="NO" />

                    </div>
                    <Divider></Divider>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap",
                            paddingTop: "20px"

                        }}
                    >
                        <TextField_Custom props1="Narrative" props2="40" props3="NO" />
                        

                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default SubForeignExchange;