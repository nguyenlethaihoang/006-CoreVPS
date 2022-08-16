import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";    

import BlockAccount from "./BlockAccount"
import CloseAccount from "./CloseAccount"
import EnquiryAccount from "./EnquiryAccount"
import OpenAccount from "./OpenAccount"
import UnblockAccount from "./UnblockAccount"

function CurrentAndNonTermSavingAccount()  {
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
                        1. Current & Non-Term Saving Account
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingLeft: "30px"}}>
                    <OpenAccount />
                    <EnquiryAccount />
                    {/* <CloseAccount /> */}
                    {/* <BlockAccount /> */}
                    {/* <UnblockAccount /> */}
                
 

                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default CurrentAndNonTermSavingAccount