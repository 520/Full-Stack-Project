import { Component } from "react";
import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-container">
                <p>404 - Page Not Found</p>
                <p>You’ve been lost in the ocean of knowledge.</p>
                <button><Link to='/'>Go Home</Link></button>
            </div>
        </div>
    )
}
export default NotFound;
