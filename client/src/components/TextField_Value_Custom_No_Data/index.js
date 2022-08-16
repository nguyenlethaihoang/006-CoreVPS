// import components library
import { TextField} from "@mui/material"
import { padding } from "@mui/system";

function TextField_Value_Custom_No_Data({props1, props2, props3, props4}) {
    let idTemp = "txt" + props1.toString().replace(/\s/g, '');  
 
    let widthTemp = props2.toString() + "ch"

    return (
        <div
            style={
                props3.toString() === "NO" ? 
                    {
                        // display:  "inline",
                        marginRight: "20px",
                        marginBottom: "20px", 
                        pointerEvents: "none"
                    }
                : 
                    {
                        // lineBreak: "auto",
                        marginRight: "20px",
                        marginBottom: "20px" 
                    }
            }
            // style={{display: "inline"}}
        >
            {props3 === "YES" && (
                <TextField 
                sx={{
                    width: `${widthTemp}`,
                }}
                required
                id = {idTemp}
                label = {props1}
                variant="outlined"
                defaultValue={props4}
            />
            )}
            {props3 === "NO" && (
                <TextField 
                sx={{
                    width: `${widthTemp}`,
                }}
                id = {idTemp}
                label = {props1}
                variant="outlined"
                defaultValue={props4}

            />
            )}
        </div>
    )
}

export default TextField_Value_Custom_No_Data;