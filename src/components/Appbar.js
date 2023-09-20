import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Appbar() {
    const [email,setEmail] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/admin/me',{
            method:'GET',
            headers:{
                'authorization': "Barrier " + localStorage.getItem('token')
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            setEmail(data["username"]);
        })
    },[])

    if(email){
        return (
            <div style={{ display: "flex", justifyContent: 'space-between',margin:3}}>
    
                <Typography variant="h5">Online Tutorial Page</Typography>
                
                <div>
                    {email}
                    <Button variant="contained" sx={{ ml: 4 }}
                        onClick={() => {
                            localStorage.setItem('token',null);
                            window.location = '/';
                        }}>Log out</Button>
                    <Button variant="contained" sx={{ ml: 4 }}
                        onClick={() => {
                            window.location = '/courses';
                        }}>Courses</Button>
                </div>
            </div>
        )
    }
    return (
        <div style={{ display: "flex", justifyContent: 'space-between',margin:3}}>

            <Typography variant="h5">Online Tutorial Page</Typography>
            <div>
                <Button variant="contained" onClick={() => {
                    window.location = '/signin';
                }}>SignIn</Button>
                <Button variant="contained" sx={{ ml: 4 }}
                    onClick={() => {
                        window.location = '/signup';
                    }}>SignUp</Button>
            </div>
        </div>
    )
}

export default Appbar;