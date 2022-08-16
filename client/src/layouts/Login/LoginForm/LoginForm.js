import { AccountCircle } from "@mui/icons-material";
import { Button, Checkbox, TextField, Typography } from "@mui/material"
import KeyIcon from '@mui/icons-material/Key';
import { Box } from "@mui/system";
import './LoginForm.css'



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function LoginForm() {
    return (
        <div className="main" 
            // action="/"
         > 
             <div className='logo'
                    style={{
                        paddingBottom : "40px",
                        paddingTop : "70px",
                        marginLeft: "15px"
                    }}
             > 
                    <img 
                        src = {process.env.PUBLIC_URL + `/Imgs/logo.png`}
                        alt = "VietVictory"
                        width= "216"
                        height = "135"
                    />
                </div>
            {/* <Typography
                fontWeight= "700" 
                variant="h4"
                color="#ea8685"
                sx={{
                    padding: "50px"
                  }}
            >
                VIET VICTORY
            </Typography>

            <Typography
                fontWeight= "600" 
                color="white"
                sx={{
                    paddingLeft: "40px",
                    paddingBottom: "100px"
                  }}
            >
                Trao nghề nghiệp - Trao tương lai
            </Typography> */}
            <Typography
                fontWeight= "600" 
                color="#d71921"
                sx={{
                    paddingLeft: "120px",
                    paddingBottom: "30px"
                }}
            >Please login to continue</Typography>

            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    paddingBottom: '20px', 
                    paddingLeft: "30px",

                }}>
                <AccountCircle 
                    sx={{ color: '#d71921', mr: 1, my: 0.5, marginBottom: 2 }} 
                />
                <TextField 
                    id="txtUsername" 
                    label="Username" 
                    variant="outlined"
                    sx={{ 
                        input: { color: 'black' }, 
                        bgcolor: 'white',
                        borderRadius: 2,
                        // p: 2,
                        minWidth: 300,
                    }}
                    color="secondary"
                    
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '20px', paddingLeft: "30px",}}>
                <KeyIcon sx={{ color: '#d71921', mr: 1, my: 0.5, marginBottom: 2 }} />
                <TextField 
                    id="txtPassword" 
                    label="Password"
                    type="password" 
                    variant="outlined"
                    sx={{ 
                        input: { color: 'black' }, 
                        bgcolor: 'white',
                        borderRadius: 2,
                        // p: 2,
                        minWidth: 300,
                    }}
                    color="secondary"
                    
                />
            </Box>
            
            <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14, paddingLeft: "30px", }}>
                <Checkbox 
                    {...label} 
                    defaultChecked 
                    sx={{
                        color: "#d71921",
                        '&.Mui-checked': {
                        color: "#d71921",
                        },
                    }}
                /> 
                <Typography
                    color="#d71921"
                    sx={{ display: 'inline'}}
                >Remember me</Typography>
            </Box>
            <br />
            <Button 
                variant="contained"
                sx={{ 
                    padding: '10px 50px', 
                    marginTop: '45px', 
                    marginLeft: '150px', 
                    // backgroundColor: '#f8c291',
                    backgroundColor: '#d71921',
                    // color: '#0a3d62',
                    color: '#fff',
                    fontStyle: 'bold',
                    '&:hover': {
                        backgroundColor: '#f8c291',
                        borderColor: '#0062cc',
                        boxShadow: 'none',
                      },
                }}
                type={"submit"}
                onClick= {
                    () => {
                        console.log('txtUsername')
                        console.log(document.getElementById('txtUsername').value)
                        console.log('txtPassword')
                        console.log(document.getElementById('txtPassword').value) 
                        if (localStorage) {
                            console.log("Save thanh cong")
                            var name = document.getElementById('txtUsername').value;
                            localStorage.setItem('name', name);
                            var pass = document.getElementById('txtPassword').value;
                            localStorage.setItem('pass', pass);
                            // localStorage.clear()
                        }
                        window.location.reload(false)
                        // window.history.pushState('Home', 'Title Home', '/')

                    }
                }
            >
                Log in
            </Button>


        </div>
    )
}

export default LoginForm