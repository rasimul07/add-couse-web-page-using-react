import { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";


function Courses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/admin/courses", {
            method: 'GET',
            headers: {
                'authorization': "Barrier " + localStorage.getItem('token')
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data);
            setCourses(data['courses'])
        })
    }, [])
    return (
        <div style={{display:'flex'}}>
            {courses.map((course) => {
                return <CourseCard course={course} />
            })}
        </div>
    )
}

function CourseCard(props) {
    return (
        <Card style={{margin:'auto',padding:5, width:300, height:300}}>
            <Typography variant='h5' textAlign={'center'}>{props.course.title}</Typography>
            <Typography  textAlign={'center'}>{props.course.description}</Typography>
            <img src={props.course.imageLink} alt="loading" style={{width:270}}></img>
            <Typography>{props.course.price}</Typography>
            <Typography>{props.course.id}</Typography>
        </Card>
    )
}
export {Courses,CourseCard} ;
