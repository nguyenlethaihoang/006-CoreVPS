import { FormControl, InputLabel, Select } from "@mui/material"
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";

function Select_Custom({props1, props2, props3, props4}) {

  const [value, setValue] = useState("")
  const handleChange = (event) => {
    setValue(event.target.value)
  };


    let urlBackend = ""
    if (props3.toString() === "city") {
        urlBackend = "https://cb-be.azurewebsites.net/storage/get_city_province"
    }
    else if (props3.toString() === "country") {
        urlBackend = "https://cb-be.azurewebsites.net/storage/get_country"
    }
    else if (props3.toString() === "doctype") {
        urlBackend = "https://cb-be.azurewebsites.net/storage/get_doctype"
    }
    else if (props3.toString() === "main_sector") {
        urlBackend = "https://cb-be.azurewebsites.net/storage/get_sector"
    }
    // else if (props3.toString() === "sub_sector") {
    //     urlBackend = "https://cb-be.azurewebsites.net/storage/get_subsector"
    // }
    else if (props3.toString() === "main_industry") {
        urlBackend = "https://cb-be.azurewebsites.net/storage/get_industry"
    }
    // else if (props3.toString() === "sub_industry") {
    //     urlBackend = "https://cb-be.azurewebsites.net/storage/get_subindustry"
    // }
    else if (props3.toString() === "account_officer") {
        urlBackend = "https://cb-be.azurewebsites.net/storage/get_account_officer"
    }
    const [bio, setBio] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${urlBackend}`);
            const data = await response.json();
            setBio(data.rows);  
        };
        fetchData();
    }, []);

    let idLabelTemp = "lbl" + props1.toString().replace(/\s/g, '');
    let idSelectTemp = "slt" + props1.toString().replace(/\s/g, '');
    let widthTemp = props2.toString() + "ch"

    if (props4 != undefined ) {
        console.log("bio")
    console.log(props4.rows)
    }

    if (props3 === "city" || props3 === "doctype" || props3 === "main_sector" || props3 === "sub_sector" 
    || props3 === "main_industry" || props3 === "account_officer") {
        return (
            <div
                style={
                    props3.toString() === "NO" ? 
                        {
                            // display:  "inline",
                            marginRight: "30px",
                            marginBottom: "20px" 
                        }
                    : 
                        {
                            // lineBreak: "auto",
                            marginRight: "30px",
                            marginBottom: "20px" 
                        }
                }
            >
                <FormControl sx={{ m: 0, minWidth: `${widthTemp}` }}>
                    <InputLabel id={idLabelTemp}>{props1}</InputLabel>
                    <Select
                        // onChange={handleChange}
                        labelId={idLabelTemp}
                        id={idSelectTemp}
                        label={props1}
                    >
    
                        {
                            bio.map((data, index) => {
                                return (
                                    <MenuItem key={index} value={data.id}>{data.Name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
        )
    } 
    // else if (props3.toString() == "country"){
    else {
        return (
            <div
                style={
                    props3.toString() === "NO" ? 
                        {
                            // display:  "inline",
                            marginRight: "30px",
                            marginBottom: "20px" 
                        }
                    : 
                        {
                            // lineBreak: "auto",
                            marginRight: "30px",
                            marginBottom: "20px" 
                        }
                }
            >
                <FormControl sx={{ m: 0, minWidth: `${widthTemp}` }}>
                    <InputLabel id={idLabelTemp}>{props1}</InputLabel>
                    <Select
                        // onChange={handleChange}
                        labelId={idLabelTemp}
                        id={idSelectTemp}
                        // value="age"
                        label={props1}
                    >
    
                        {
                            bio.map((data, index) => {
                                return (
                                    <MenuItem key={index} value={data.Code}>{data.Code}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
        )
    }

    
}

export default Select_Custom;