import { Button, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Individual_Custom.css'
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import axios from 'axios';
import Select_Value_Custom from '../../../../components/Select_Value_Custom';
import TextField_Value_Custom from '../../../../components/TextField_Value_Custom';
import Popup_Custom from '../../../../components/Popup_Custom';
import Notification_Custom from '../../../../components/Notification_Custom'; 
import FileSaver from 'file-saver'


import individualFile from '../../../../resources/Files/individual.docx';








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

let arr = []
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
function checkCode(a, b) {
    let temp = null
    a.map((data, index) => {
        if (data.Code == b)
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

const onDownload = (customerID) => {
    // const [bioFile, setBioFile] = useState([]);
    // useEffect(() => {
    //     const fetchDataFile = async () => {
    //         const response = await fetch();
    //         //const data = await response.json();
    //         //setBioCity(data.rows);  
    //     };
    //     fetchDataFile();
    // }, []);

    
  };

function Individual_Custom(props1) {
    const [buttonPopup, setButtonPopup] = useState(false) 
    const [buttonPopupFail, setButtonPopupFail] = useState(false)
    const [buttonPopupNoti, setButtonPopupNoti] = useState(false)

    // downloadEmployeeData = () => {
	// 	fetch('http://localhost:81/employees/download')
	// 		.then(response => {
	// 			response.blob().then(blob => {
	// 				let url = window.URL.createObjectURL(blob);
	// 				let a = document.createElement('a');
	// 				a.href = url;
	// 				a.download = 'employees.json';
	// 				a.click();
	// 			});
	// 			//window.location.href = response.url;
	// 	});
	// }

   

    console.log("props AccountCode")
    console.log(props1.AccountCode)

    
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

    console.log("detaillllll")
    console.log(props1.AccountCode01)
    



  return (props1.trigger) ? 
  (

    <div className="popup-i">
        <div className='popup-inner-i'>
            
            <h1>
                Customer Info - Individual
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
                            document.getElementById("foo").style['pointer-events'] = 'auto';
                            document.getElementById("foo").style['opacity'] = '1';
                            document.getElementById("bar").style['pointer-events'] = 'auto';
                            document.getElementById("bar").style['opacity'] = '1';
                        }}
                    />
                </IconButton>
                <IconButton>
                    <PrintIcon 
                        onClick={
                            () => {
                                const customerID = 7
                                console.log(customerID)
                                axios.get(`https://api-newcore.vietvictory.vn/export/individual/${customerID}`)
                                .then(res => {
                                    // DOWNLOAD FILE
                                    console.log(res.data.data)
                                    console.log(res.data.blobName)
                                    const link = res.data.data
                     				let a = document.createElement('a');
                     				a.href = link;
                     				a.download = `${props1.AccountCode01.GB_FullName}.docx`;
                     				a.click();
                                    
                                    return res.data.blobName                                    
                                })
                                // .then((blobName)=> {
                                //      DELETE FILE
                                //     console.log("blobName")
                                //     console.log(blobName.toString())
                                //     axios.post(`https://api-newcore.vietvictory.vn/export/delete`, {
                                //         blobName: blobName.toString()
                                //     })
                                //     .then((res01)=> {
                                //         console.log(res01)
                                //     })
                                //     .catch(err =>{
                                //         console.log(err)
                                //     })
                                // })
                                .catch(err => {
                                    console.log(err)
                                })

                            }
                        }
                    />
                </IconButton>
                {/*     <a href={individualFile} download="individual.docx"> Download Here </a> */}
                
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
                onChange={() => {
                    document.getElementById('txtGBShortName...').value = document.getElementById('txtLastName...').value + " " + document.getElementById('txtMiddleName...').value + " " + document.getElementById('txtFirstName...').value
                    document.getElementById('txtGBFullName...').value = document.getElementById('txtGBShortName...').value;
                }}
            >
                <TextField_Value_Custom props1="First Name..." props2="20" props3="NO" props4={props1.AccountCode01.FirstName}/>
                <TextField_Value_Custom props1="Last Name ..." props2="20" props3="NO" props4={props1.AccountCode01.LastName}/>
                <TextField_Value_Custom props1="Middle Name ..." props2="20" props3="NO" props4={props1.AccountCode01.MiddleName}/>
                <TextField_Value_Custom props1="GB Short Name..." props2="20" props3="YES" props4={props1.AccountCode.GB_ShortName}/>
                <TextField_Value_Custom props1="GB Full Name..." props2="30" props3="YES" props4={props1.AccountCode["GB_FullName"]}/>
                {/* Incorp Date(*) */}
                <TextField_Value_Custom props1="GB Street..." props2="25" props3="YES" props4={props1.AccountCode["GB_Street"]}/>
                <TextField_Value_Custom props1="GB Town/Dist..." props2="25" props3="YES" props4={props1.AccountCode["GB_Towndist"]}/>
                {/* <Select_Value_Custom props1="City/Province.." props2="35" props3="city" props4={bioCity} props5={bioCity} props6="Category"/> */}
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `30ch` }}>
                    <InputLabel id="lblCity/Province...">City/Province..</InputLabel>
                        <Select
                            labelId="lblCity/Province..."
                            id="txtCity/Province..."
                            defaultValue={props1.AccountCode.CityProvince}
                            label="City/Province..."
                        >
                            {
                                bioCity.map((data, index) => {
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
                    <FormControl sx={{ m: 0, minWidth: `20ch` }}>
                    <InputLabel id="lblCountry...">GB Country</InputLabel>
                        <Select 
                            labelId="lblCountry..."
                            id="txtCountry..."
                            label="GB Country..."
                            defaultValue={props1.AccountCode?.GB_Country}
                            //onChange={handleChangeCountry}  
                            //value={country}
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
                    <InputLabel id="lblNationality...">Nationality</InputLabel>
                        <Select
                            labelId="lblNationality..."
                            id="txtNationality..."
                            label="Nationality..."
                            defaultValue={props1.AccountCode.Nationality}
                            // onchange={handleChangeNationality}
                            // value={nationality} 
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
                    <InputLabel id="lblResidence...">Residence</InputLabel>
                        <Select
                            labelId="lblResidence..."
                            id="txtResidence..."
                            // value={residence}
                            defaultValue={props1.AccountCode.Residence}
                            label="Residence..."
                            // onchange={handleChangeResidence}
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
                    <InputLabel id="lblDocType...">Doc Type</InputLabel>
                        <Select
                            labelId="lblDocType..."
                            id="txtDocType..."
                            // value={docType}
                            defaultValue={props1.AccountCode.Doctype}
                            label="DocType..."
                            // onchange={handleChangeDocType}
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

                <TextField_Value_Custom props1="Doc ID..." props2="15" props3="YES" props4={props1.AccountCode.DocID}/>
                <TextField_Value_Custom props1="Doc Issue Place..." props2="20" props3="YES" props4={props1.AccountCode.DocIssuePlace}/>
                {/* Doc Issue Date: (*)	 */}
                <TextField_Value_Custom props1="Contact Person..." props2="15" props3="YES" props4={props1.AccountCode01.ContactPerson}/>
                <TextField_Value_Custom props1="Position..." props2="15" props3="YES" props4={props1.AccountCode01.Position}/>
                <TextField_Value_Custom props1="Telephone..." props2="15" props3="YES" props4={props1.AccountCode.PhoneNumber}/>
                <TextField_Value_Custom props1="Email Address..." props2="20" props3="YES" props4={props1.AccountCode01.EmailAddress}/>
                <TextField_Value_Custom props1="Remarks..." props2="15" props3="YES" props4={props1.AccountCode01.Remarks}/>
                
                <div
                    style={{
                        marginRight: "30px",
                        marginBottom: "20px" 
                    }}
                >
                    <FormControl sx={{ m: 0, minWidth: `30ch` }}>
                    <InputLabel id="lblMainSector...">Main Sector</InputLabel>
                        <Select
                            labelId="lblMainSector..."
                            id="txtMainSector..."
                            // value={mainSector}
                            defaultValue={props1.AccountCode.MainSector}
                            label="MainSector..."
                            // onchange={handleChangeMainSector}
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
                    <InputLabel id="lblSubSector...">Sub Sector</InputLabel>
                        <Select
                            labelId="lblSubSector..."
                            id="txtSubSector..."
                            // value={subSector}
                            defaultValue={props1.AccountCode.SubSector}
                            label="SubSector..."
                            // onchange={handleChangeSubSector}
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
                    <FormControl sx={{ m: 0, minWidth: `25ch` }}>
                    <InputLabel id="lblMainIndustry...">Main Industry</InputLabel>
                        <Select
                            labelId="lblMainIndustry..."
                            id="txtMainIndustry..."
                            // value={mainIndustry}
                            defaultValue={props1.AccountCode.MainIndustry}
                            label="MainIndustry..."
                            // onchange={handleChangeMainIndustry}
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
                    <FormControl sx={{ m: 0, minWidth: `25ch` }}>
                    <InputLabel id="lblSubIndustry...">Industry</InputLabel>
                        <Select
                            labelId="lblSubIndustry..."
                            id="txtSubIndustry..."
                            // value={subIndustry}
                            defaultValue={props1.AccountCode.Industry}
                            label="SubIndustry..."
                            // onchange={handleChangeSubIndustry}
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
                    <InputLabel id="lblAccountOfficer...">Account Officer</InputLabel>
                        <Select
                            labelId="lblAccountOfficer..."
                            id="txtAccountOfficer..."
                            // value={accountOfficer}
                            defaultValue={props1.AccountCode.AccountOfficer}
                            label="AccountOfficer..."
                            // onchange={handleChangeAccountOfficer}
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
                <TextField_Value_Custom props1="Company Book..." props2="20" props3="YES" props4="CHI NHANH TAN BINH"/>
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
                    onClick={() => {
                        let txtCity = document.getElementById("txtCity/Province...").textContent.toString();
                        let txtCountry = document.getElementById('txtCountry...').textContent.toString();
                        let txtNationality = document.getElementById('txtNationality...').textContent.toString();
                        let txtResidence = document.getElementById('txtResidence...').textContent.toString();
                        let txtDoctype = document.getElementById('txtDocType...').textContent.toString();
                        let txtMainSector = document.getElementById('txtMainSector...').textContent.toString(); 
                        let txtSubSector =  document.getElementById('txtSubSector...').textContent.toString();  
                        let txtMainIndustry = document.getElementById('txtMainIndustry...').textContent.toString();
                        let txtSubIndustry = document.getElementById('txtSubIndustry...').textContent.toString();
                        let txtAccountOfficer = document.getElementById('txtAccountOfficer...').textContent.toString();
                        arr = []
                        if (document.getElementById('txtGBShortName...').value.length == 1 || document.getElementById('txtGBShortName...').value.length == 0) arr.push(`"GB Short Name" is Required`);
                        if (document.getElementById('txtGBFullName...').value.length == 1 || document.getElementById('txtGBFullName...').value.length == 0) arr.push(`"GB Full Name" is Required`);
                        if (document.getElementById('txtDocID...').value.length == 1 || document.getElementById('txtDocID...').value.length == 0) arr.push(`"Doc ID" is Required`);
                        if (document.getElementById('txtTelephone...').value.length == 1 || document.getElementById('txtTelephone...').value.length == 0) arr.push(`"Telephone" is Required`);
                        
                        if (arr.length != 0) {
                            setButtonPopupNoti(true)
                            
                        }
                        else {
                            axios.put(`https://api-newcore.vietvictory.vn/customer/update_individual_customer/${props1.AccountCode.id}`,{
                                firstName: document.getElementById('txtFirstName...').value.toString(),
                                lastName: document.getElementById('txtLastName...').value.toString(),
                                middletName: document.getElementById('txtMiddleName...').value.toString(),
                                GB_ShortName:document.getElementById('txtGBShortName...').value.toString(),
                                GB_FullName: document.getElementById('txtGBFullName...').value,
                                GB_Street: document.getElementById('txtGBStreet...').value,
                                GB_Towndist: document.getElementById('txtGBTown/Dist...').value,
                                docID: document.getElementById('txtDocID...').value,
                                docIssuePlace: document.getElementById('txtDocIssuePlace...').value,
                                // docIssueDate:  document.getElementById('dpDocIssueDate...').value,
                                // docExpiryDate:  document.getElementById('dpDocExpiryDate...').value,
                                contactPerson: document.getElementById('txtContactPerson...').value,
                                position: document.getElementById('txtPosition...').value,
                                officeNumber: document.getElementById('txtTelephone...').value,
                                emailAddress: document.getElementById('txtEmailAddress...').value, 
                                remarks: document.getElementById('txtRemarks...').value,
                                
                                cityProvince: checkName(bioCity,txtCity),
                                GB_Country: checkCode(bioCountry, txtCountry),
                                nationality: checkCode(bioCountry, txtNationality),
                                residence: checkCode(bioCountry, txtResidence),
                                doctype: checkName(bioDoctype, txtDoctype),
                                mainSector: checkName(bioMainSector, txtMainSector),
                                sector: checkName(bioSubSector, txtSubSector),
                                mainIndustry: checkName(bioMainIndustry, txtMainIndustry),
                                industry: checkName(bioSubIndustry, txtSubIndustry),
                                accountOfficer: checkName(bioAccountOfficer, txtAccountOfficer),
                            })
                            .then(res => {
                                console.log("res: update corporate")
                                console.log(res)
                                console.log("hihihe lan 2")
                                console.log(document.getElementById('txtGBFullName...').value)
                                console.log(document.getElementById('txtGBShortName...').value.toString())
                                console.log(document.getElementById('txtEmailAddress...').value)
                                console.log("vvvvvv")
                                console.log(document.getElementById('txtFirstName...').value.toString())
                                setButtonPopup(true)


                            })
                            .catch(err=>{
                                console.log("err")
                                console.log(err)
                                arr = [] 
                                arr.push(`Customer existed`);
                                setButtonPopupNoti(true)
                            })
                            }
                        
                    }}
                >
                    Save
                </Button>
                <Popup_Custom 
                            trigger={buttonPopup}
                            setTrigger={setButtonPopup}
                        >
                            
                </Popup_Custom>
                <Notification_Custom
                    trigger={buttonPopupNoti}
                    setTrigger={setButtonPopupNoti}
                    arr={arr}
                >

                </Notification_Custom>

                <Button 
                    className="close-btn"
                    variant='contained'
                    color='error'
                    onClick={() => 
                        
                        {
                            props1.setTrigger(false)
                            props1=null
                        }
                    }
                >
                    Cancel
                </Button>
            </div>
            
        </div>
    </div>
  ) :  "";
}

export default Individual_Custom