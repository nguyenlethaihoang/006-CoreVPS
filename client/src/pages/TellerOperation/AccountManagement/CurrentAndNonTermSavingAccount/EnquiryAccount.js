import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";    
import TextField_Custom from "../../../../components/TextField_Custom";
import Select_Custom from "../../../../components/Select_Custom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import { useEffect, useState } from "react";
import axios from "axios";
import Actions from "./Actions";

const customerTypeData = [{id: 0, Name: 'All'}, {id: 1,Name: 'P - Person' },{id: 2,Name: 'C - Corporate'},]

const currencyData = [{id: 0, Name: 'None'}, {id: 1,Name: 'EUR' },{id: 2,Name: 'USD'},{id: 3,Name: 'GBP'},{id: 4,Name: 'JPY'},{id: 5,Name: 'VND'},]

function createData(AccountCode, CustomerID, CustomerName, DocID, Category, ProductLine, Currency, ActualBallance, WorkingAmount, LockedAmount) {
    return { AccountCode, CustomerID, CustomerName, DocID, Category, ProductLine, Currency , ActualBallance, WorkingAmount, LockedAmount};
  }

let rows = [];

function checkName(a, b) {
    let temp = null
    a.map((data, index) => {
        if (data.Name == b && b != 'None')
        {
            temp = data.id.toString()
            
        }
    })
    return temp
}

function EnquiryAccount() {
    const [bioRow, setBioRow] = useState([]);
    useEffect(() => {
        setBioRow(bioRow)
    }) 

    const [bioGetAll, setBioGetAll] = useState([]);
    useEffect(() => {
        const fetchDataGetAll = async () => {
            await axios.post(' https://api-newcore.vietvictory.vn/account/debit_account/enquiry', {

            }).then(response => {
                console.log("response Get all")
                console.log(response.data.data)
                const dataRes = response.data.data
                setBioGetAll(dataRes); 
                 
            })
            
        };
        fetchDataGetAll();
    }, []);

    const [bioCategory, setBioCategory] = useState([]);
    useEffect(() => {
        const fetchDataCustomer = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_category`);
            const data = await response.json();
            // console.log("dataProductLine")
            // console.log(data)
            setBioCategory(data.rows);  
        };
        fetchDataCustomer();
    }, []);

    const [bioProductLine, setBioProductLine] = useState([]);
    useEffect(() => {
        const fetchDataCustomer = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_product_line`);
            const data = await response.json();
            // console.log("dataProductLine")
            // console.log(data)
            setBioProductLine(data.rows);  
        };
        fetchDataCustomer();
    }, []);
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
                        1.2 Enquiry Account
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
                        <TextField_Custom props1="Account Code." props2="35" props3="NO"/>
                        <Select_Custom props1="Currency." props2="35" props3="city" props4={currencyData}/>
                        <Select_Custom props1="Customer Type." props2="20" props3="NO" props4={customerTypeData}/>
                        <TextField_Custom props1="Customer ID." props2="35" props3="NO"/>
                        <TextField_Custom props1="GB Full Name." props2="35" props3="NO"/>
                        <TextField_Custom props1="Doc ID." props2="35" props3="NO"/>
                        <Select_Custom props1="Category." props2="20" props3="NO" props4={bioCategory}/>
                        <Select_Custom props1="Product Line." props2="35" props3="city" props4={bioProductLine}/>


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
                                let valueCustomerType = null;
                                let txtCustomerType = document.getElementById('sltCustomerType.').textContent.toString();
                                
                                if (txtCustomerType.length == 10)
                                    valueCustomerType = 1;
                                else if (txtCustomerType.length == 13)
                                    valueCustomerType = 2;
                                console.log("category Log")
                                console.log(document.getElementById('sltCategory.').textContent.toString())
                                console.log(checkName( bioCategory, document.getElementById('sltCategory.').textContent.toString()))
                                console.log('con khi')
                                const fetchDataGetAll = async () => {
                                    await axios.post(' https://api-newcore.vietvictory.vn/account/debit_account/enquiry', {
                                        customerID: parseInt(document.getElementById('txtCustomerID.').value.toString()),
                                        account: parseInt(document.getElementById('txtAccountCode.').value.toString()),
                                        currency: checkName( currencyData, document.getElementById('sltCurrency.').textContent.toString()),
                                        customerType: valueCustomerType,
                                        GB_FullName: document.getElementById('txtGBFullName.').value.toString(),
                                        docID: document.getElementById('txtDocID.').value.toString(),
                                        category: checkName( bioCategory, document.getElementById('sltCategory.').textContent.toString()),
                                        productLine: checkName(bioProductLine, document.getElementById('sltProductLine.').textContent.toString())
                                    }).then(response => {
                                        // console.log("enquiry account")
                                        // console.log(response.data)
                                        const dataRes = response.data.data
                                        setBioGetAll(dataRes); 
                                         
                                    })
                                    
                                };

                                fetchDataGetAll();
                                console.log(bioGetAll)
                                bioGetAll.map((value, index) => {
                                    let tempProductLine = ""
                                    let tempCategory = ""
                                    let tempCurrency = ""
                                    if (value.PRODUCTLINE != null) tempProductLine = value.PRODUCTLINE.Name
                                    if (value.CATEGORY != null) tempCategory = value.CATEGORY.Name
                                    if (value.CURRENCY != null) tempCurrency = value.CURRENCY.Name
                                    rows.push(createData(value.id ,
                                                        value.CustomerID, 
                                                        value.Customer.GB_FullName, 
                                                        value.Customer.DocID, 
                                                        tempCategory, 
                                                        tempProductLine, 
                                                        tempCurrency, 
                                                        value.ActualBalance,
                                                        value.WorkingAmount, 
                                                        <Actions AccountCode={value.id}/>, 
                                                        ))
                                })
                                // console.log("rows")
                                // console.log(rows)
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
                                                {row.AccountCode}
                                            </TableCell>
                                            <TableCell align="center">{row.CustomerID}</TableCell>
                                            <TableCell align="center">{row.CustomerName}</TableCell>
                                            <TableCell align="center">{row.DocID}</TableCell>
                                            <TableCell align="center">{row.Category}</TableCell>
                                            <TableCell align="center">{row.ProductLine}</TableCell>
                                            <TableCell align="center">{row.Currency}</TableCell>
                                            <TableCell align="center">{row.ActualBallance}</TableCell>
                                            <TableCell align="center">{row.WorkingAmount}</TableCell>
                                            <TableCell 
                                                align="center"
                                                onClick={() => {
                                                    // setBioRow([])
                                                }}
                                            >
                                                {row.LockedAmount}
                                            </TableCell>
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

export default EnquiryAccount