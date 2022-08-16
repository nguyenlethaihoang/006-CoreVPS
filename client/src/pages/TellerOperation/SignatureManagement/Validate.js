import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TextField_Custom from '../../../components/TextField_Custom'             
import Button_Custom from "../../../components/Button_Custom";
import Select_Custom from "../../../components/Select_Custom";
import { useState } from "react";

const statusData = [
    {id: 1,
    Name: '1 - Pending' },
    {
    id: 2,
    Name: '2 - Valid'},
    {id: 3,
    Name: '3 - In Valid'}
]

function Validate() {

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
                        4. Validate
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
                            <TextField_Custom props1="Customer ID" props2="30" props3="NO"/>
                            <Select_Custom props1="Status" props2="35" props3="city" props4={statusData}/>

                    </div>
                    <div
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexWrap: "wrap"
                            }}
                        >
                            <Button
                                variant="contained"
                            >
                                Save
                            </Button>
                    </div>
                    
                        


                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Validate;