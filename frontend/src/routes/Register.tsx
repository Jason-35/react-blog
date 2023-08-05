import { Form, Link, useActionData } from "react-router-dom"
import '../styles/Register.css'
import { Alert, TextField } from "@mui/material"

export default function Register(){
    const data = useActionData()

    return <div className="container text-white">
        { data ? <Alert severity="error">this username already exist!</Alert> : <></>}
        <nav className="nav-banner text-white">
            <ul className="nav-2-items">
                <li className="icon">Blogger</li>
                <li className="sign-in-text font-fam-roboto"><p>Already have an account?</p> <Link to={'/login'}><button className="u-button font-size-1rm">Sign In</button></Link></li>
            </ul>
        </nav>
        <div className="sub-container register-sub-container font-fam-roboto register-form">
            <div className="form-container">
            <Form className="UILoginSignupForm circle-corner-left" method="post" action="/register">
                <div className="register-text">
                    <h1>Sign up for your account 😎</h1>
                </div>
                <div className="input-container">
                    <TextField
                        label="Username"
                        name="Username"
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
                <button className="press-button" type="submit" name="intent" value="register">Continue</button>
            </Form>
            <div className="register-form-pic circle-corner-right"></div>
            </div>
        </div>
    </div>
}