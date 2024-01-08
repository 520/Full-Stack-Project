import "./index.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRealName, getRole} from "../../utils/cookie";
import StringUtils from "../../utils/StringUtils";

export const Nav = ({apiJson, onSubmit}) => {

    useEffect(() => {
        setUsername(getRealName());
    }, []);

    const [username, setUsername] = useState('');

    return (
        <div className="nav">
            <div className="nav-left"><p>Library</p></div>
            <div>
        <nav className="nav-middle">
            <Link to='/'>Home</Link>
            { StringUtils.isEmpty(getRole()) == true ?
                (<></>):
                (<><Link to='/user'>Users</Link><Link to='/books'>Books</Link></>)
            }

            <Link to='/borrowing'>Borrowings</Link>
            <Link to='/history'>History</Link>
            <Link to='/saved'>Favourites</Link>
        </nav>
            </div>
            <div className="nav-right"><p>{username}, <Link to="/login" className="logout">Log out</Link></p></div>
        </div>
    )
}
