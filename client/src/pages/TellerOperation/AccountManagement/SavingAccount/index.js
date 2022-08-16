import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";    

import CloseArrearPeriodic from "./CloseArrearPeriodic"
import CloseDiscounted from "./CloseDiscounted"
import EnquiryArrearAndPeriodic from "./EnquiryArrearAndPeriodic"
import EnquiryDiscounted from "./EnquiryDiscounted"
import OpenArrear from "./OpenArrear"
import OpenDiscounted from "./OpenDiscounted"
import OpenPeriodic from "./OpenPeriodic"

function SavingAccount() {
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
                        2. Saving Account
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingLeft: "30px"}}>
                    <OpenArrear />
                    <OpenPeriodic />
                    <OpenDiscounted />
                    <EnquiryArrearAndPeriodic />
                    {/* <EnquiryDiscounted /> */}
                    {/* <CloseArrearPeriodic /> */}
                    {/* <CloseDiscounted /> */}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default SavingAccount