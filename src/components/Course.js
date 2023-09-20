import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CourseCard } from "./Courses";
import { TextField, Button, Paper, Typography } from "@mui/material";

function Course() {
    let { courseId } = useParams();       //this is param hook
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
        }).catch((err)=>{
            console.error(err);
        })
        
    }, [])

    let course = null;

    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === parseInt(courseId)) {
            course = courses[i];
            break;
        }
    }

    //param don't match with course Id
    if (!course) {
        return (
            <div>
                {JSON.stringify(course)}
            </div>
        )
    }

    return (
        <div>
            {/* {courseId}
            {JSON.stringify(course)} */}
            <CourseCard course={course}></CourseCard>
            <UpdataCard course={course} courses={courses} setCourses={setCourses} courseId={courseId}></UpdataCard>
        </div>
    )
}

function UpdataCard(props) {
    const course = props.course;
    const courses = props.courses;
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [price, setPrice] = useState(course.price);
    const [imageLink, setImageLink] = useState(course.imageLink);
    const [message, setMessage] = useState("");
    return (
        <div style={{ display: "flex", margin:10 }}>
            <Paper elevation={3} component={'form'} sx={{ p: 2, width: 400, margin: 'auto' }}>
                <TextField
                    variant="outlined"
                    label='title'
                    fullWidth={true}
                    sx={{ mb: 2 }}
                    value={title}
                    placeholder={""}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                ></TextField>

                <TextField
                    variant="outlined"
                    label='description'
                    multiline
                    maxRows={3}
                    fullWidth={true}
                    sx={{ mb: 2 }}
                    placeholder={""}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                ></TextField>

                <TextField
                    variant="outlined"
                    label='ImageLInk'
                    maxRows={3}
                    fullWidth={true}
                    sx={{ mb: 2 }}
                    value={imageLink}
                    placeholder={""}
                    onChange={(e) => {
                        setImageLink(e.target.value);
                    }}
                ></TextField>

                <TextField
                    variant="outlined"
                    type="number"
                    label='price'
                    size="small"
                    sx={{ mb: 2 }}
                    value={price}
                    placeholder={""}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                ></TextField>

                <Typography variant='caption' style={{ color: 'red' }}>{message}</Typography>
                <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={() => {
                        ///eficient way using state variable in react
                        fetch('http://localhost:3000/admin/courses/' + props.course.id, {
                            method: 'PUT',
                            body: JSON.stringify({
                                title,
                                description,
                                price,
                                imageLink

                            }),
                            headers: {
                                'Content-type': 'application/json',
                                'authorization': "Barrier " + localStorage.getItem('token')
                            }
                        }
                        ).then(response => {
                            return response.json();
                        }).then(data => {
                            const token = data["token"];
                            setMessage(data["message"])

                            //for live reflect of course update
                            const updatedCourses = [];
                            for (let i = 0; i < courses.length; i++) {
                                if (courses[i].id === parseInt(props.courseId)) {
                                    updatedCourses.push({
                                        id: courses[i].id,
                                        title,
                                        description,
                                        price,
                                        imageLink,
                                    });
                                } else {
                                    updatedCourses.push(courses[i]);
                                }
                            }

                            props.setCourses(updatedCourses);
                            if (token) {
                                localStorage.setItem("token", data["token"])
                            }

                        })    // to store in local storage in browser
                    }}
                >Update Course</Button>
            </Paper>
        </div>
    )
}

export default Course;