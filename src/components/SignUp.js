import Button from '@mui/material/Button'
import { Card, TextField, Typography } from '@mui/material';
import { useState } from 'react';
// style={{border:"2px solid red"} }
function SignUp() {

    const [email,setEmail] = useState(""); //initailly empty
    const [password,setPassword] = useState(""); //initailly empty
    const [message,setMessage] = useState("");
    return (
        
        <div id="signUp-Outer">

            {/* live change for for use of onChange */}
            {/* {email}
            {password} */}
            
            <div>
                <center>
                    <Typography>Welcome to coursera, SignUp below</Typography>
                </center>
                <Card varient="outlined" id="signUp">
                    <TextField 
                    id="user" 
                    label="Email"
                    variant="outlined"
                    fullWidth
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    required={true}
                     />
                    <br></br>
                    <br></br>
                    <TextField id="pass"
                    label="password"
                    variant="outlined"
                    fullWidth
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    required={true}
                     />
                    <br></br>
                    <Typography variant='caption' style={{color:'red'}}>{message}</Typography>
                    <br></br>
                    <Button variant="contained"
                    onClick={()=>{

                        //naive way to get username, password from form web page
                        // const username = document.getElementById("user").value;
                        // const password = document.getElementById("pass").value;
                        // console.log(username,password);

                        ///eficient way using state variable in react
                        fetch('http://localhost:3000/admin/signup',{
                            method:'POST',
                            body:JSON.stringify({
                                //if key and value have same name
                                // username,
                                // password

                                username: email,
                                password: password
                            }),
                            headers:{
                                'Content-Type': 'application/json'
                            }
                        },
                        ).then(response=>{
                            return response.json();
                        }).then(data => { const token = data["token"];
                        setMessage(data["message"])
                        if(token){
                            localStorage.setItem("token", data["token"])
                        }})    // to store in local storage in browser
                    }}
                    >Sign-Up</Button>
                </Card>
            </div>
        </div>
    )
}

export default SignUp;