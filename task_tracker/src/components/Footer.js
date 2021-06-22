import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <p style={{color: 'white'}}>Copyright &copy: 2021</p>
            <Link to="/about" style={{color: 'white'}}>About</Link>    
        </footer>
    )
}

export default Footer
