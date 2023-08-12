import { Link, Outlet } from "react-router-dom"
import '../styles/Navbar.css'
import { useLoaderData, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Navbar(){
    const username = useLoaderData() as string
    const navigate = useNavigate()
    
    const handleLogout = async() => {
        localStorage.clear()
        await axios.post("http://localhost:4000/api/logout", {}, {withCredentials: true})
        navigate("/login")
    }


    return (
    <div className="container text-white">
        <nav className="nav-banner text-white">
            <ul className="user-navbar">
                <div className="first-nav">
                <li><Link to={`/home/${username}`}><button className="u-button font-size-1-5rm">{ username }</button></Link></li>
                </div>
                <div className="middle-nav">
                    <li><Link to={'/home/browse?page=1'}><button className="u-button font-size-1-5rm">Browse</button></Link></li>
                    <li><Link to={`/home/${username}/create`}><button className="u-button font-size-1-5rm">Blog</button></Link></li>
                    <li><Link to={`/home/${username}/collection?page=1`}><button className="u-button font-size-1-5rm">Collections</button></Link></li>
                </div>
                <div className="last-nav">
                <li><button className="u-button font-size-1-5rm" type="button" name="intent" value="logout"  onClick={handleLogout}>Logout</button></li>
                </div>
            </ul>
        </nav>
        <Outlet/>
    </div>
    )
}