import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";    
import TextField_Custom from "../../../../components/TextField_Custom";
import Select_Custom from "../../../../components/Select_Custom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { useEffect, useState } from "react";

const customerTypeData = [{id: 1,Name: 'P - Person' },{id: 2,Name: 'C - Corporate'},]

const currencyData = [{id: 1,Name: 'USD' },{id: 2,Name: 'EUR'},{id: 3,Name: 'GBP'},{id: 4,Name: 'JPY'},{id: 5,Name: 'VND'},]

function createData(CustomerID, CustomerType, GBFullName, DocID, CellPhoneOfficeNum) {
    return { CustomerID, CustomerType, GBFullName, DocID, CellPhoneOfficeNum };
  }

let rows = [];

function UnblockAccount() {
    const [bioRow, setBioRow] = useState([]);
    useEffect(() => {
        setBioRow(bioRow)
    })
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
                        1.5 Un-Block Account 
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
                        <TextField_Custom props1="Account Code" props2="35" props3="NO"/>
                        <Select_Custom props1="Currency" props2="35" props3="city" props4={currencyData}/>
                        <Select_Custom props1="Customer Type" props2="20" props3="NO" props4={customerTypeData}/>
                        <TextField_Custom props1="Customer ID" props2="35" props3="NO"/>
                        <TextField_Custom props1="GB Full Name" props2="35" props3="NO"/>
                        <TextField_Custom props1="Doc ID" props2="35" props3="NO"/>
                        {/* <Select_Custom props1="Category" props2="20" props3="NO" props4={customerTypeData}/> */}
                        {/* <Select_Custom props1="Product Line" props2="35" props3="city" props4={productLineData}/> */}


                    </div>

                    <div
                        style={{ 
                            // display: "flex", 
                            width: "100%", 
                            paddingBottom: "20px",
                            // backgroundColor: "#333", 
                            // flexWrap: "wrap"
                        }}
                    >
                        <Button 
                            variant="outlined" 
                            startIcon={<ManageSearchIcon />}
                            onClick={() => {
                                rows = [];
                                
                              }}
                        >
                            Search
                        </Button>
                    </div>
                    <div
                        style={{ 
                            // display: "flex", 
                            width: "100%", 
                            // backgroundColor: "#333", 
                            // flexWrap: "wrap"
                        }}
                    >
                        <TableContainer component={Paper}>
                            <Table 
                                sx={{ minWidth: 650 }} 
                                aria-label="simple table"
                                id="sample-table"
                            > 
                                <TableHead>
                                <TableRow>
                                    <TableCell align="center">Account Code</TableCell>
                                    <TableCell align="center">Customer ID</TableCell>
                                    <TableCell align="center">Customer Name</TableCell>
                                    <TableCell align="center">Doc ID</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                    <TableCell align="center">Product Line</TableCell>
                                    <TableCell align="center">Currency</TableCell>
                                    <TableCell align="center">Actual Ballance</TableCell>
                                    <TableCell align="center">Working Amount</TableCell>
                                    <TableCell align="center">Locked Amount</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bioRow.map((row,index) => (
                                        <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center" component="right" scope="row">
                                                {row.CustomerID}
                                            </TableCell>
                                            <TableCell align="center">{row.CustomerType}</TableCell>
                                            <TableCell align="center">{row.GBFullName}</TableCell>
                                            <TableCell align="center">{row.DocID}</TableCell>
                                            <TableCell align="center">{row.CellPhoneOfficeNum}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default UnblockAccount