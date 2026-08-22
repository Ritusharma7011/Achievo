import React, { use, useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/common/Navbar'
import Error from './pages/Error'
import ResetPassword from './pages/ResetPassword'
import Loading from './components/common/Loading'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import MyProfile from './components/core/Dashboard/MyProfile'
import ProtectedRoute from './components/core/Auth/ProtectedRoute'
import Dashboard from "./pages/Dashboard";
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart'
import { ACCOUNT_TYPE } from './utils/constants'
import { useSelector } from 'react-redux'
import Settings from './components/core/Dashboard/Settings'
import AddCourse from './components/core/Dashboard/AddCourse'
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse'
import Catalog from './pages/Catalog'
import CourseDetails from "./pages/CourseDetails"


function App() {

  const {user} = useSelector((state)=>state.profile);

  return (
    <div className='w-screen min-h-screen bg-background font-sora scroll-smooth '>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/signup' element = {<Signup/>}></Route>
        <Route path='/forgot-password' element={<ResetPassword/>}></Route>
        <Route path='/update-password/:id' element={<UpdatePassword/>}></Route>
        <Route path='/verify-email' element={<VerifyEmail/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<ContactUs/>}></Route>
        <Route path='/catalog/:catalogName' element={<Catalog/>}></Route>
        <Route path="courses/:courseId" element={<CourseDetails />} />



        {/* Protected Routes */}
        {/* <Route path='dashboard/my-profile'
        element={
            <ProtectedRoute>
              <MyProfile/>
            </ProtectedRoute>
        }
        /> ESE NI KRNA */}

        <Route
        element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
        }
        > 
          <Route path='dashboard/my-profile' element ={<MyProfile/>} />
          <Route path='dashboard/settings' element ={<Settings/>} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='dashboard/enrolled-courses' element ={<EnrolledCourses/>} /> 
                <Route path='dashboard/cart' element ={<Cart/>} /> 
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='dashboard/add-course' element ={<AddCourse/>} /> 
                <Route path='dashboard/my-courses' element= {<MyCourses/>}/>
                <Route path='dashboard/edit-course/:courseId' element= {<EditCourse/>}/>
              </>
            )
          }
          

        </Route>

        <Route path = "*" element = {<Error/>} />
      </Routes>
    </div>

  )
}

export default App
