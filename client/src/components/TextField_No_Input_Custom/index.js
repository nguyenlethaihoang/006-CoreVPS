// import components library
import { TextField} from "@mui/material"
import { padding } from "@mui/system";

function TextField_Custom({props1, props2, props3}) {
    let idTemp = "txt" + props1.toString().replace(/\s/g, '');  

    let widthTemp = props2.toString() + "ch"

    return (
        <div
            style={
                props3.toString() === "NO" ? 
                    {
                        // display:  "inline",
                        marginRight: "20px",
                        marginBottom: "20px" 
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
            />
            )}
        </div>
    )
}

export default TextField_Custom;