import { Link } from "react-router-dom"
import '../styles/Homepage.css'

export default function Homepage(){
    return ( 
    <div className="container text-white">
        <nav className="nav-banner text-white">
            <ul className="nav-2-items">
                <li className="icon">Blogger</li>
                <li><Link to={'/login'}><button className="u-button font-size-1rm">login</button></Link></li>
            </ul>
        </nav>
        <div className="sub-container home-sub-container font-fam-roboto">
            <div className="home-text">
                <h1>Publish <br/> Your <br/> Passions</h1>
            </div>
            <Link to={'/register'}><button className="register u-button">Start Now</button></Link>
        </div>
    </div>
    )
}
