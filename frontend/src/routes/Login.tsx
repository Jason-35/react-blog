import { Form, Link, useActionData } from "react-router-dom"
import '../styles/Login.css'
import TextField from "@mui/material/TextField/TextField"
import { Alert } from "@mui/material"
// import { useState } from 'react'

export default function Login(){
    const data = useActionData() as {invalid: boolean}

    return (
    <div className="container text-white">
        {data && data.invalid ? <Alert severity="error">incorrect credentials</Alert> : <></>}
        <nav className="nav-banner text-white">
            <ul className="nav-2-items">
                <li className="icon">Blogger</li>
                <li className="sign-in-text font-fam-roboto"><p>Don't have an account?</p> <Link to={'/register'}><button className="u-button font-size-1rm">Register</button></Link></li>
            </ul>
        </nav>
        <div className="sub-container login-sub-container font-fam-roboto register-form">
            <div className="form-container">
            <Form className="UILoginSignupForm circle-corner-left"  method="post" action="/login">
                <div className="login-text">
                    <h1>Welcome Back 😎</h1>
                    <p>Please enter your details</p>
                </div>
                <div className="input-container">
                    <TextField
                        label="Username"
                        name="Username"
                        type="username"
                        variant="filled"
                        sx={{backgroundColor: 'white', borderRadius: '3px'}}
                        required={true}
                    />
                    <TextField
                        id="filled-basic"
                        label="Password"
                        name="Password"
                        variant="filled"
                        type="password"
                        sx={{backgroundColor: 'white', borderRadius: '3px'}}
                        required={true}
                    />
                </div>
                <button className="press-button" type="submit" name="intent" value="login">Continue</button>
            </Form>
            <div className="login-form-pic circle-corner-right"></div>
            </div>
        </div>
    </div>
    )
}