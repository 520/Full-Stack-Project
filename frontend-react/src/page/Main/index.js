import './index.css';
import {useEffect} from "react";
import {Nav} from "../../component/Nav";
import {SearchBar} from "../../component/SearchBar";
import {ChatBox} from "../../component/ChatBox";
import Book from "../Book";
import Books from "../Books";
import {Outlet, useNavigate} from "react-router-dom";
import {getRealName, getToken} from "../../utils/cookie";
import StringUtils from "../../utils/StringUtils";

const Main = () => {

    const navigator = useNavigate();

    useEffect(() => {
        if (StringUtils.isEmpty(getToken())) {
            navigator('/login');
        }
    }, []);

    return (
        <div>
            <Nav/>
            <SearchBar/>
            <ChatBox/>
            <div className="outlet-container">
                <div className="outlet-constrain">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Main;
