import { Link } from "react-router-dom"
import '../styles/Login.css'
import TextField from "@mui/material/TextField/TextField"
import { useState } from 'react'

export default function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(`user ${username} with password ${password} has logged in`)
    }

    return (
    <div className="container text-white">
        <nav className="nav-banner text-white">
            <ul className="nav-2-items">
                <li className="icon">Blogger</li>
                <li className="sign-in-text font-fam-roboto"><p>Don't have an account?</p> <Link to={'/register'}><button className="u-button font-size-1rm">Register</button></Link></li>
            </ul>
        </nav>
        <div className="sub-container login-sub-container font-fam-roboto register-form">
            <div className="form-container">
            <form className="UILoginSignupForm circle-corner-left" onSubmit={handleSubmit}>
                <div className="login-text">
                    <h1>Welcome Back 😎</h1>
                    <p>Please enter your details</p>
                </div>
                <div className="input-container">
                    <TextField
                        label="Username"
                        variant="filled"
                        sx={{backgroundColor: 'white', borderRadius: '3px'}}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />
                    <TextField
                        id="filled-basic"
                        label="Password"
                        variant="filled"
                        type="password"
                        sx={{backgroundColor: 'white', borderRadius: '3px'}}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </div>
                <button className="press-button">Continue</button>
            </form>
            <div className="login-form-pic circle-corner-right"></div>
            </div>
        </div>
    </div>
    )
}