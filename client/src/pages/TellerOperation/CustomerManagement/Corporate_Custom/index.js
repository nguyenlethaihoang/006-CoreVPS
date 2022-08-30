import { Button, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Corporate_Custom.css'
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import axios from 'axios';
import Select_Value_Custom from '../../../../components/Select_Value_Custom';
import TextField_Value_Custom from '../../../../components/TextField_Value_Custom';


const categoryData = [
    {id: 1,
    Name: '1000 - Tiền  gửi tiết kiệm' },
    {
    id: 2,
    Name: '2000 - Tiết kiệm không kỳ hạn'},
]

const currencyData = [{id: 1, Name: 'USD' },{id: 2,Name: 'EUR'},{id: 3,Name: 'GBP'},{id: 4,Name: 'JPY'},{id: 5,Name: 'VND'},]
const countryData = [
    {
        id: 1,
        Name: '',
    },
]

function checkName(a, b) {
    let temp = null
    a.map((data, index) => {
        if (data.Name == b)
        {
            temp = data.id.toString()
            
        }
    })
    return temp
}

function checkNameCustomerID(a, b) {
    let temp = null
    a.map((data, index) => {
        if (b.includes(data.GB_FullName))
        {
            temp = data.id.toString()
            
        }
    })
    return temp
}

function Corporate_Custom(props1) {
    const [buttonPopup, setButtonPopup] = useState(false) 
    const [buttonPopupFail, setButtonPopupFail] = useState(false)
    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)

    console.log("props")
    console.log(props1)
    
    const [bioCity, setBioCity] = useState([]);
    useEffect(() => {
        const fetchDataCity = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_city_province`);
            const data = await response.json();
            setBioCity(data.rows);  
        };
        fetchDataCity();
    }, []);

    const [bioCountry, setBioCountry] = useState([]);
    useEffect(() => {
        const fetchDataCountry = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_country`);
            const data = await response.json();
            setBioCountry(data.rows);  
        };
        fetchDataCountry();
    }, []);

    const [bioDoctype, setBioDoctype] = useState([]);
    useEffect(() => {
        const fetchDataDoctype = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_doctype`);
            const data = await response.json();
            setBioDoctype(data.rows);  
        };
        fetchDataDoctype();
    }, []);

    const [bioMainSector, setBioMainSector] = useState([]);
    useEffect(() => {
        const fetchDataMainSector = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_sector`);
            const data = await response.json();
            setBioMainSector(data.rows);  
        };
        fetchDataMainSector();
    }, []);

    const [bioSubSector, setBioSubSector] = useState([]);
    useEffect(() => {
        const fetchDataSubSector = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_subsector`);
            const data = await response.json();
            console.log("subsector")
            console.log(data)
            setBioSubSector(data.data.subsector);  
        };
        fetchDataSubSector();
    }, []);

    const [bioMainIndustry, setBioMainIndustry] = useState([]);
    useEffect(() => {
        const fetchDataMainIndustry = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_industry`);
            const data = await response.json();
            setBioMainIndustry(data.rows);  
        };
        fetchDataMainIndustry();
    }, []);

    const [bioSubIndustry, setBioSubIndustry] = useState([]);
    useEffect(() => {
        const fetchDataSubIndustry = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_subindustry`);
            const data = await response.json();
            setBioSubIndustry(data.data.subIndustry);  
        };
        fetchDataSubIndustry();
    }, []);

    const [bioAccountOfficer, setBioAccountOfficer] = useState([]);
    useEffect(() => {
        const fetchDataAccountOfficer = async () => {
            const response = await fetch(`https://api-newcore.vietvictory.vn/storage/get_account_officer`);
            const data = await response.json();
            setBioAccountOfficer(data.rows);  
        };
        fetchDataAccountOfficer();
    }, []);

    const [country, setCountry] = useState(`${props1.AccountCode.COUNTRY.Name}`);
    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    };

    const [nationality, setNationality] = useState(`${props1.AccountCode?.Nationality}`);
    const handleChangeNationality = (event) => {
        setNationality(event.target.value);
    };

    const [residence, setResidence] = useState(`${props1.AccountCode?.Residence}`);
    const handleChangeResidence = (event) => {
        setResidence(event.target.value);
    };

    const [docType, setDocType] = useState(`${props1.AccountCode?.Doctype}`);
    const handleChangeDocType = (event) => {
        setDocType(event.target.value);
    };

    const [mainSector, setMainSector] = useState(`${props1.AccountCode?.MainSector}`);
    const handleChangeMainSector = (event) => {
        setMainSector(event.target.value);
    };

    const [subSector, setSubSector] = useState(`${props1.AccountCode?.SubSector}`);
    const handleChangeSubSector = (event) => {
        setSubSector(event.target.value);
    };

    const [mainIndustry, setMainIndustry] = useState(`${props1.AccountCode?.MainIndustry}`);
    const handleChangeMainIndustry = (event) => {
        setMainIndustry(event.target.value);
    };

    const [subIndustry, setSubIndustry] = useState(`${props1.AccountCode?.Industry}`);
    const handleChangeSubIndustry = (event) => {
        setSubIndustry(event.target.value);
    };

    const [accountOfficer, setAccountOfficer] = useState(`${props1.AccountCode?.AccountOfficer}`);
    const handleChangeAccountOfficer = (event) => {
        setAccountOfficer(event.target.value);
    };

    console.log(props1.AccountCode)
    
  return (props1.trigger) ? 
  (

    <div className="popup-c">
        <div className='popup-inner-c'>
            
            <h1>
                Corporate - {props1.AccountCode.id}
            </h1>
            <div
                style={{ 
                    display: "flex", 
                    width: "100%", 
                    flexWrap: "wrap",
                    paddingBottom: "20px"
                }}
            >
                <IconButton>
                    <EditIcon 
                        onClick={()=> {
                            // const element = document.getElementById('foo');
                            // element.css({
                            //     'backgroundColor':'red',
                            // })
                            document.getElementById("foo").style['pointer-events'] = 'auto';
                            document.getElementById("foo").style['opacity'] = '1';
                            document.getElementById("bar").style['pointer-events'] = 'auto';
                            document.getElementById("bar").style['opacity'] = '1';
                        }}
                    />
                </IconButton>
                <IconButton>
                    <PrintIcon />
                </IconButton>
                <IconButton></IconButton>
            </div>
            <div
                style={{ 
                    display: "flex", 
                    width: "100%", 
                    flexWrap: "wrap",
                    paddingBottom: "20px"
                }}
            >
                {/* <h3>Account Code: {bioFilled.id} </h3> */}
            </div>
            
            <div
                id='foo'
                style={{ 
                    display: "flex", 
                    width: "100%", 
                    flexWrap: "wrap"
                }}
            >
                 
                {/* <Select_Value_Custom props1="Customer ID." props2="35" props3="city" props4={bioCustomer} props5={bioFilled} props6="CustomerID"/>
                <Select_Value_Custom props1="Category." props2="35" props3="city" props4={categoryData} props5={bioFilled} props6="Category"/>
                <Select_Value_Custom  props1="Product Line." props2="35" props3="city" props4={bioProductLine} props5={bioFilled} props6="ProductLine"/>
                <Select_Value_Custom props1="Currency." props2="15" props3="city" props4={currencyData} props5={bioFilled} props6="Currency"/>
                <TextField_Value_Custom props1="Account Title." props2="40" props3="YES" props4={bioFilled.AccountTitle}/>
                <TextField_Value_Custom props1="Short Title." props2="40" props3="YES" props4={bioFilled.ShortTitle}/>
                <Select_Value_Custom props1="Account Officer." props2="25" props3="account_officer" props4={bioAccountOfficer} props5={bioFilled} props6="AccountOfficer"/>
                <Select_Value_Custom props1="Charge Code." props2="25" props3="account_officer" props4={bioChargeCode} props5={bioFilled} props6="ChargeCode"/> */}
                <TextField_Value_Custom props1="GB Short Name.." props2="20" props3="YES" props4={props1.AccountCode["GB_ShortName"]}/>
                <TextField_Value_Custom props1="GB Full Name.." props2="30" props3="YES" props4={props1.AccountCode["GB_FullName"]}/>
                {/* Incorp Date(*) */}
                <TextField_Value_Custom props1="GB Street.." props2="25" props3="YES" props4={props1.AccountCode["GB_Street"]}/>
                <TextField_Value_Custom props1="GB Town/Dist.." props2="25" props3="YES" props4={props1.AccountCode["GB_Towndist"]}/>
                {/* <Select_Value_Custom props1="City/Province.." props2="35" props3="city" props4={bioCity} props5={bioCity} props6="Category"/> */}
                {/* <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `30ch` }}>
                    <InputLabel id="lblCity/Province..">City/Province..</InputLabel>
                        <Select
                            labelId="lblCity/Province.."
                            id="txtCity/Province.."
                            value={props1.AccountCode.CityProvince}
                            label="City/Province.."
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div> */}
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `25ch` }}>
                    <InputLabel id="lblCountry..">GB Country</InputLabel>
                        <Select
                            labelId="lblCountry.."
                            id="txtCountry.."
                            label="GB Country.."
                            defaultValue={props1.AccountCode.COUNTRY.Name}
                            onChange={handleChangeCountry}
                            value = {country}
                        >
                            {
                                bioCountry.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Code}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `25ch` }}>
                    <InputLabel id="lblNationality..">Nationality</InputLabel>
                        <Select
                            labelId="lblNationality.."
                            id="txtNationality.."
                            label="Nationality.."
                            defaultValue={props1.AccountCode.Nationality}
                            onchange={handleChangeNationality}
                            value={nationality} 
                        >
                            {
                                bioCountry.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Code}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `30ch` }}>
                    <InputLabel id="lblResidence..">Residence</InputLabel>
                        <Select
                            labelId="lblResidence.."
                            id="txtResidence.."
                            value={residence}
                            defaultValue={props1.AccountCode.Residence}
                            label="Residence.."
                            onchange={handleChangeResidence}
                        >
                            {
                                bioCountry.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Code}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>  
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `20ch` }}>
                    <InputLabel id="lblDocType..">Doc Type</InputLabel>
                        <Select
                            labelId="lblDocType.."
                            id="txtDocType.."
                            value={docType}
                            defaultValue={props1.AccountCode.Doctype}
                            label="DocType.."
                            onchange={handleChangeDocType}
                        >
                            {
                                bioDoctype.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>  

                <TextField_Value_Custom props1="Tax Identification Number.." props2="18" props3="YES" props4={props1.AccountCode.DocID}/>
                <TextField_Value_Custom props1="Doc Issue Place.." props2="25" props3="YES" props4={props1.AccountCode.DocIssuePlace}/>
                {/* Doc Issue Date: (*)	 */}
                <TextField_Value_Custom props1="Contact Person.." props2="20" props3="YES" props4={props1.AccountCode.ContactPerson}/>
                <TextField_Value_Custom props1="Position.." props2="20" props3="YES" props4={props1.AccountCode.Position}/>
                <TextField_Value_Custom props1="Telephone.." props2="15" props3="YES" props4={props1.AccountCode.ContactPerson}/>
                <TextField_Value_Custom props1="Email Address.." props2="20" props3="YES" props4={props1.AccountCode.EmailAddress}/>
                <TextField_Value_Custom props1="Remarks.." props2="30" props3="YES" props4={props1.AccountCode.Remarks}/>
                
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `30ch` }}>
                    <InputLabel id="lblMainSector..">Main Sector</InputLabel>
                        <Select
                            labelId="lblMainSector.."
                            id="txtMainSector.."
                            value={mainSector}
                            defaultValue={props1.AccountCode.MainSector}
                            label="MainSector.."
                            onchange={handleChangeMainSector}
                        >
                            {
                                bioMainSector.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `30ch` }}>
                    <InputLabel id="lblSubSector..">Sub Sector</InputLabel>
                        <Select
                            labelId="lblSubSector.."
                            id="txtSubSector.."
                            value={subSector}
                            defaultValue={props1.AccountCode.SubSector}
                            label="SubSector.."
                            onchange={handleChangeSubSector}
                        >
                            {
                                bioSubSector.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `30ch` }}>
                    <InputLabel id="lblMainIndustry..">Main Industry</InputLabel>
                        <Select
                            labelId="lblMainIndustry.."
                            id="txtMainIndustry.."
                            value={mainIndustry}
                            defaultValue={props1.AccountCode.MainIndustry}
                            label="MainIndustry.."
                            onchange={handleChangeMainIndustry}
                        >
                            {
                                bioMainIndustry.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `30ch` }}>
                    <InputLabel id="lblSubIndustry..">Industry</InputLabel>
                        <Select
                            labelId="lblSubIndustry.."
                            id="txtSubIndustry.."
                            value={subIndustry}
                            defaultValue={props1.AccountCode.subIndustry}
                            label="SubIndustry.."
                            onchange={handleChangeSubIndustry}
                        >
                            {
                                bioSubIndustry.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>

                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `30ch` }}>
                    <InputLabel id="lblAccountOfficer..">Account Officer</InputLabel>
                        <Select
                            labelId="lblAccountOfficer.."
                            id="txtAccountOfficer.."
                            value={accountOfficer}
                            defaultValue={props1.AccountCode.AccountOfficer}
                            label="AccountOfficer.."
                            onchange={handleChangeAccountOfficer}
                        >
                            {
                                bioAccountOfficer.map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data.id}>{data.Name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <TextField_Value_Custom props1="Company Book.." props2="30" props3="YES" props4="CHI NHANH TAN BINH"/>
            </div>
 
            <hr/>

            <div
                style={{ 
                    // display: "flex", 
                    alignItems: "center",
                    width: "100%", 
                    // flexWrap: "wrap",
                    paddingTop: "10px"
                }}
            >
                <Button 
                    className="close-btn"
                    variant='contained'
                    color='success'
                    sx={{
                        marginRight: "30px"
                    }}
                    
                >
                    Save
                </Button>

                <Button 
                    className="close-btn"
                    variant='contained'
                    color='error'
                    onClick={() => 
                        
                        {
                            props1.setTrigger(false)}
                    }
                >
                    Cancel
                </Button>
            </div>
            
        </div>
    </div>
  ) :  "";
}

export default Corporate_Custom