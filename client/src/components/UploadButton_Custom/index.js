import Button from '@mui/material/Button';


function UploadButton_Custom({props1, props2, props3}) {
    // let idTemp = "dp" + props1.toString().replace(/\s/g, '');
    // let widthTemp = props2.toString() + "ch"
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
        >
            <Button 
                // variant="contained" 
                variant="outlined"
                component="label"
                size='large'
                // color="secondary"
            >
                {props1}
                <input hidden accept="image/*" multiple type="file" />
            </Button>
        </div>
    )
}

export default UploadButton_Custom;