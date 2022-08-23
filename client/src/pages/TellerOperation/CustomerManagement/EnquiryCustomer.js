import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";    

import TextField_Custom from '../../../components/TextField_Custom'
import Select_Custom from "../../../components/Select_Custom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import axios from "axios";


function createData(CustomerID, CustomerType, GBFullName, DocID, CellPhoneOfficeNum) {
    return { CustomerID, CustomerType, GBFullName, DocID, CellPhoneOfficeNum };
  }

let rows = [];

const customerTypeData = [
    {id: 1,
    Name: 'P - Person' },
    {
    id: 2,
    Name: 'C - Corporate'},
    {
    id: 3,
    Name: 'All'},
]

function EnquiryCustomer() {

    const [bioRow, setBioRow] = useState([]);
    useEffect(() => {
        setBioRow(bioRow)
    })
    const [bioGetAll, setBioGetAll] = useState([]);
    useEffect(() => {
        const fetchDataGetAll = async () => {
            await axios.post('https://api-newcore.vietvictory.vn/customer/enquiry_customer', {
                // https://api-newcore.vietvictory.vn/customer/enquiry_customer
                // https://api-newcore.vietvictory.vn/customer/get_all_customer
                // "customerType": 2
            }).then(response => {
                console.log("response")
                console.log(response)
                const dataRes = response.data.data
                setBioGetAll(dataRes); 
                 
            })
            
        };
        fetchDataGetAll();
    }, []);

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
                        3. Enquiry Customer
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
                        
                        
                        <Select_Custom props1="Customer Type" props2="20" props3="NO" props4={customerTypeData}/>
                        <TextField_Custom props1="Customer ID.." props2="30" props3="NO"/>
                        <TextField_Custom props1="Cell Phone/Office Num.." props2="20" props3="NO"/>
                        <TextField_Custom props1="GB Full Name.." props2="30" props3="NO"/>
                        <TextField_Custom props1="Doc ID.." props2="20" props3="NO"/>
                        <Select_Custom props1="Main Sector" props2="20" props3="NO"/>
                        <Select_Custom props1="SubSector" props2="20" props3="NO"/>
                        <Select_Custom props1="Main Industry" props2="20" props3="NO"/>
                        <Select_Custom props1="Sub Industry" props2="20" props3="NO"/>
                        
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
                                console.log("cus ID")
                                console.log(parseInt(document.getElementById('txtCustomerID..').value))
                                let txtCustomerType = null
                                if (document.getElementById('sltCustomerType').textContent.toString().length == 10)
                                    txtCustomerType = 1;
                                    if (document.getElementById('sltCustomerType').textContent.toString().length == 13)
                                    txtCustomerType = 2;
                                // setBioGetAll(rows)
                                const fetchDataGetAll = async () => {
                                    await axios.post('https://api-newcore.vietvictory.vn/customer/enquiry_customer', {
                                        "customerType": txtCustomerType,
                                        "customerID": parseInt(document.getElementById('txtCustomerID..').value),
                                        "docID": document.getElementById('txtDocID..').value.toString(),
                                        "phoneNumber": document.getElementById('txtCellPhone/OfficeNum..').value.toString(),
                                        "GB_FullName": document.getElementById('txtGBFullName..').value.toString(),
                                        
                                    }).then(response => {
                                        console.log("enquiry test")
                                        console.log(response)
                                        const dataRes = response.data.data
                                        setBioGetAll(dataRes); 
                                         
                                    })
                                    
                                };
                                fetchDataGetAll();
                                bioGetAll.map((value, index) => {
                                    rows.push(createData(value.id, value.CustomerType, value.GB_FullName, value.DocID, value.PhoneNumber))
                                })
                                setBioRow(rows)
                                
                              }}
                        >
                            Search
                        </Button>

                        <Button 
                            sx={{ 
                                // display: "flex", 
                                marginLeft: "20px",
                                // backgroundColor: "#333", 
                                // flexWrap: "wrap"
                            }}
                            variant="outlined" 
                            color="error"
                            startIcon={<DeleteSweepIcon />}
                            onClick={() => {
                                rows = [];
                                // setBioGetAll(rows)
                                setBioRow(rows)
                                
                              }}
                        >
                            Hide
                        </Button>
                    </div>
                    <div
                        style= {{
                            marginBottom: "20px"
                        }}
                    >
                        <i>*Note: Click twice "Search" to update the table</i>
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
                                    <TableCell align="center">Customer ID</TableCell>
                                    <TableCell align="center">Customer Type</TableCell>
                                    <TableCell align="center">GB Full Name</TableCell>
                                    <TableCell align="center">Doc ID</TableCell>
                                    <TableCell align="center">Cell Phone/Office Num</TableCell>
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

export default EnquiryCustomer