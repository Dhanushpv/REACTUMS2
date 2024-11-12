import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Componet/LoginPage/Login.css'
import Login from './Componet/LoginPage/Login'
import Admin from './Componet/adminPage/admin';
import './Componet/adminPage/admin.css'
import Employee from './Componet/employee/Employee';
import './Componet/employee/Employee.css'
import AddEmployee from './Componet/Addemployee/AddEmployee';
import './Componet/Addemployee/AddEmployee.css'
import SingleEmpView from './Componet/SingleEmpView/SingleEmpView';
import './Componet/SingleEmpView/SingleEmpView.css'
import UpdateUser from './Componet/Updateuser/UpdateUser';
import './Componet/Updateuser/UpdateUser.css'
import Reset from './Componet/Reset/Reset';
import './Componet/Reset/Reset.css'
import ForgetPassword from './Componet/ForgertPassword/ForgetPassword';
import './Componet/ForgertPassword/ForgetPassword.css'
import ForgetReset from './Componet/Reset/ForgetRepassword';

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path={'/'} exact element={<Login />} />
          <Route path={'/Login'} exact element={<Login />} />
          <Route path={'/Admin'} exact element={<Admin />} />
          <Route path={'/Employee'} exact element={<Employee />} />
          <Route path={'/AddEmployee'} exact element={<AddEmployee />} />
          <Route path={'/SingleEmpView'} exact element={<SingleEmpView />} />
          <Route path={'/UpdateUser'} exact element={<UpdateUser />} />
          <Route path={'/Reset'} exact element={<Reset />} />
          <Route path={'/ForgetPassword'} exact element={<ForgetPassword />} />
          <Route path={'/ForgetReset'} exact element={<ForgetReset />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
