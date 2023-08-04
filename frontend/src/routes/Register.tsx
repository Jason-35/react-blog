import { Link } from "react-router-dom"
import '../styles/Register.css'
import { TextField } from "@mui/material"
import { useState } from 'react'

export default function Register(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const info = { username, password}
        console.log(`user ${info.username} registered with ${password}}`)
    }

    return <div className="container text-white">
        <nav className="nav-banner text-white">
            <ul className="nav-2-items">
                <li className="icon">Blogger</li>
                <li className="sign-in-text font-fam-roboto"><p>Already have an account?</p> <Link to={'/login'}><button className="u-button font-size-1rm">Sign In</button></Link></li>
            </ul>
        </nav>
        <div className="sub-container register-sub-container font-fam-roboto register-form">
            <div className="form-container">
            <form className="UILoginSignupForm circle-corner-left" onSubmit={handleSubmit}>
                <div className="register-text">
                    <h1>Sign up for your account 😎</h1>
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
            <div className="register-form-pic circle-corner-right"></div>
            </div>
        </div>
    </div>
}