import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";    
import SearchIcon from '@mui/icons-material/Search';
import TextField_Custom from '../../../components/TextField_Custom'
import Select_Custom from "../../../components/Select_Custom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useLocation } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import axios from "axios";
import Individual_Custom from "./Individual_Custom";
import Corporate_Custom from "./Corporate_Custom";
import TempComponent from "./tempComponent"

let AccountCode 
let AccountCode01
let component
let arrCP = []
arrCP['P'] = 1;
arrCP['C'] = 3;
let cusTemp
let triggerTemp
let setTriggerTemp
function createData(CustomerID, CustomerType, GBFullName, DocID, CellPhoneOfficeNum, Detail) {
    return { CustomerID, CustomerType, GBFullName, DocID, CellPhoneOfficeNum, Detail };
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

    const [buttonPopup, setButtonPopup] = useState(false)
    const [buttonPopupCorporate, setButtonPopupCorporate] = useState(false)

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
                // console.log("response")
                // console.log(response)
                const dataRes = response.data.data
                setBioGetAll(dataRes); 
                console.log("bioGetAll")
                console.log(bioGetAll)
                 
            })
            
        };
        fetchDataGetAll();
    }, []);

    const [bioGetHet, setBioGetHet] = useState([]);
    useEffect(() => {
        const fetchDataGetHet = async () => {
            await axios.get('https://api-newcore.vietvictory.vn/customer/get_all_customer', {
                // https://api-newcore.vietvictory.vn/customer/enquiry_customer
                // https://api-newcore.vietvictory.vn/customer/get_all_customer
                // "customerType": 2
            }).then(response => {
                // console.log("response")
                // console.log(response)
                const dataRes = response.data.data.customer
                console.log("bioGetHet")
                console.log(response.data.data.customer)
                setBioGetHet(dataRes); 
                
                 
            })
            
        };
        fetchDataGetHet();
    }, []);

    const [bioGetHet01, setBioGetHet01] = useState([]);
    useEffect(() => {
        const fetchDataGetHet01 = async () => {
            await axios.get('https://api-newcore.vietvictory.vn/customer/get_all_customer', {
                // https://api-newcore.vietvictory.vn/customer/enquiry_customer
                // https://api-newcore.vietvictory.vn/customer/get_all_customer
                // "customerType": 2
            }).then(response => {
                // console.log("response")
                // console.log(response)
                const dataRes = response.data.data.customer.detail
                console.log("bioGetHet01")
                console.log(response.data.data.customer.detail)
                setBioGetHet01(dataRes); 
                
                 
            })
            
        };
        fetchDataGetHet01();
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
                                let txtCustomerType = null
                                cusTemp = 0;
                                if (document.getElementById('sltCustomerType').textContent.toString().length == 10)
                                    {
                                        txtCustomerType = 1;
                                        cusTemp = 100000;
                                    }
                                if (document.getElementById('sltCustomerType').textContent.toString().length == 13)
                                {
                                    txtCustomerType = 2;
                                    cusTemp = 300000;
                                }
                                else {
                                    if  (parseInt(document.getElementById('txtCustomerID..').value) > 100000 && parseInt(document.getElementById('txtCustomerID..').value) < 200000)
                                        cusTemp = 100000;
                                    else if (parseInt(document.getElementById('txtCustomerID..').value) > 200000 && parseInt(document.getElementById('txtCustomerID..').value) < 300000)
                                        cusTemp = 200000;
                                    else cusTemp = 300000;
                                }
                                // setBioGetAll(rows)
                                const fetchDataGetAll = async () => {
                                    await axios.post('https://api-newcore.vietvictory.vn/customer/enquiry_customer', {
                                        "customerType": txtCustomerType,
                                        "customerID": parseInt(document.getElementById('txtCustomerID..').value)-cusTemp,
                                        "docID": document.getElementById('txtDocID..').value.toString(),
                                        "phoneNumber": document.getElementById('txtCellPhone/OfficeNum..').value.toString(),
                                        "GB_FullName": document.getElementById('txtGBFullName..').value.toString(),
                                        
                                    }).then(response => {
                                        const dataRes = response.data.data
                                        setBioGetAll(dataRes); 
                                         
                                    })
                                    
                                };
                                fetchDataGetAll();
                                bioGetAll.map((value, index) => {
                                    let txtType = "";
                                    if (value.CustomerType == 1) txtType = "P"
                                    else txtType = "C"
                                    rows.push(createData(value.id, txtType, value.GB_FullName, value.DocID, value.PhoneNumber))
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
                                    <TableCell align="center">Detail</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {bioRow.map((row,index) => (
                                    <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="right" scope="row">
                                            {row.CustomerID+100000*arrCP[row.CustomerType]}
                                        </TableCell>
                                        <TableCell align="center">{row.CustomerType}</TableCell>
                                        <TableCell align="center">{row.GBFullName}</TableCell>
                                        <TableCell align="center">{row.DocID}</TableCell>
                                        <TableCell align="center">{row.CellPhoneOfficeNum}</TableCell>
                                        <TableCell align="center">
                                            <IconButton color="primary" aria-label="information details" component="label">
                                                <SearchIcon  
                                                    onClick={() => {     
                                                        if (row.CustomerType == 'P') {
                                                            AccountCode = bioGetHet[index].customer
                                                            AccountCode01 = bioGetHet[index].detail
                                                            setButtonPopup(true) 
                                                            component = 1
                                                        } else {
                                                            AccountCode = bioGetHet[index].customer
                                                            AccountCode01 = bioGetHet[index].detail
                                                            setButtonPopupCorporate(true)
                                                            component = 2
                                                        }
                                                    }}
                                                />
                                            </IconButton>
                                            </TableCell>
                                    </TableRow>
          ))}
                                </TableBody>
                                {/* <Individual_Custom 
                                    trigger={buttonPopup}
                                    setTrigger={setButtonPopup}
                                    AccountCode={AccountCode}
                                ></Individual_Custom>
                                <Corporate_Custom 
                                    trigger={buttonPopupCorporate}
                                    setTrigger={setButtonPopupCorporate}
                                    AccountCode={AccountCode}
                                ></Corporate_Custom> */}
                                <TempComponent
                                    trigger01={buttonPopupCorporate}
                                    setTrigger01={setButtonPopupCorporate}
                                    trigger={buttonPopup}
                                    setTrigger={setButtonPopup}
                                    
                                    AccountCode={AccountCode}
                                    AccountCode01={AccountCode01}
                                    component={component}
                                >
                                    
                                </TempComponent>
                            </Table>
                        </TableContainer>
                                

                    </div>
                
 

                </AccordionDetails>
            </Accordion>
        </div>
    ) 
}

export default EnquiryCustomer