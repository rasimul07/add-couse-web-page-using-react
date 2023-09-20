
// npm install @mui/material @emotion/react @emotion/styled //to install mui
//npm install react-router-dom
//F:\harkirat course\assingments\all-assignments\week-3\solutions\03   //for backend

import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import SignUp from "./components/SignUp"
import SignIn from './components/SignIn'
import Appbar from "./components/Appbar"
import AddCourse from "./components/AddCourse"
import {Courses} from "./components/Courses"
import Course from "./components/Course"
function App() {

  return (
    <>
      {/* also write your component
      <SignUp></SignUp> */}
      {/* <SignIn></SignIn> */}

      <Appbar/> 
      <Router>
        <Routes>
          <Route path="/addcourse" element={<AddCourse/>} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/course/:courseId" element={<Course/>} />
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
