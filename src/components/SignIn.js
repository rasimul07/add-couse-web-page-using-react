import Button from '@mui/material/Button'
import { Card, TextField, Typography } from '@mui/material';
import { useState } from 'react';
// style={{border:"2px solid red"} }
function SignIn() {
    const [email, setEmail] = useState(""); //initailly empty
    const [password, setPassword] = useState(""); //initailly empty
    const [message,setMessage] = useState("");

    return (
        <div id="signUp-Outer">
            <div>
                <center>
                    <Typography>Welcome to coursera, SignIn below</Typography>
                </center>
                <Card varient="outlined" id="signUp">
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth={true}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <br></br>
                    <br></br>
                    <TextField
                        label="password"
                        variant="outlined"
                        fullWidth={true}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <br></br>
                    <Typography variant='caption' style={{color:'red'}}>{message}</Typography>
                    <br></br>
                    <Button variant="contained"
                        onClick={() => {
                            ///eficient way using state variable in react
                            fetch('http://localhost:3000/admin/login', {
                                method: 'POST',
                                headers: {
                                    'username': email,
                                    "password": password
                                }
                            }
                            ).then(response => {
                                return response.json();
                            }).then(data => {  
                                const token = data["token"];
                                setMessage(data["message"])
                                if(token){
                                    window.location = '/addcourse'
                                    localStorage.setItem("token", data["token"])
                                }

                            })    // to store in local storage in browser
                        }}
                    >Sign-In</Button>
                </Card>
            </div>
        </div>
    )
}

export default SignIn;