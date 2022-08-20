import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";    
import TextField_Custom from "../../../../components/TextField_Custom";
import Select_Custom from "../../../../components/Select_Custom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import { useEffect, useState } from "react";
import axios from "axios";

const customerTypeData = [{id: 1,Name: 'P - Person' },{id: 2,Name: 'C - Corporate'},]

const typeData = [{id: 1,Name: 'Arrear' },{id: 2,Name: 'Periodic'},]

const currencyData = [{id: 1,Name: 'USD' },{id: 2,Name: 'EUR'},{id: 3,Name: 'GBP'},{id: 4,Name: 'JPY'},{id: 5,Name: 'VND'},]

function createData(RefID, Starts, CustomerID, Category, CCY, ProductLine, Principal) {
    return { RefID, Starts, CustomerID, Category, CCY, ProductLine, Principal};
  }

let rows = [];

function EnquiryArrearAndPeriodic() {
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
                        2.4 Enquiry Arrear and Periodic
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
                        <Select_Custom props1="Type" props2="15" props3="city" props4={typeData}/>



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
                                let url = "https://api-newcore.vietvictory.vn/account/saving_account/enquiry_arrear"
                                if (document.getElementById('sltType').innerText.toString() != "Arrear") {
                                    url = "https://api-newcore.vietvictory.vn/account/saving_account/enquiry_periodic"
                                }
                                const fetchDataGetAll = async () => {
                                    await axios.post(`${url}`, {
                                    }).then(response => {
                                        const dataRes = response.data.data
                                        setBioGetAll(dataRes); 
                                        console.log("dataEnquiryArreatPer")
                                        console.log(dataRes)
                                         
                                    })
                                    
                                };

                                fetchDataGetAll();
                                bioGetAll.map((value, index) => {
                                    rows.push(createData(
                                                        value.id, 
                                                        value.CurrencyT.Name, 
                                                        value.SAVINGACCOUNT.CustomerID, 
                                                        value.CATEGORY.Name, 
                                                        value.CurrencyT.Name, 
                                                        "", 
                                                        value.PrincipalAmount,
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
                                    <TableCell align="center">Ref ID</TableCell>
                                    <TableCell align="center">Starts</TableCell>
                                    <TableCell align="center">Customer ID</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                    <TableCell align="center">CCY</TableCell>
                                    <TableCell align="center">Product Line</TableCell>
                                    <TableCell align="center">Principal</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bioRow.map((row,index) => (
                                        <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center" component="right" scope="row">
                                                {row.RefID}
                                            </TableCell>
                                            <TableCell align="center">{row.Starts}</TableCell>
                                            <TableCell align="center">{row.CustomerID}</TableCell>
                                            <TableCell align="center">{row.Category}</TableCell>
                                            <TableCell align="center">{row.CCY}</TableCell>
                                            <TableCell align="center">{row.ProductLine}</TableCell>
                                            <TableCell align="center">{row.Principal}</TableCell>
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

export default EnquiryArrearAndPeriodic