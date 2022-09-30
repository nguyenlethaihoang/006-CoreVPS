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

function TransferWithdrawal() {
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
                        1.5 Transfer Withdrawal
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingLeft: "30px"}}>

                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default TransferWithdrawal