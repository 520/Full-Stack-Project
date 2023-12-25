import './index.css';
import {useEffect, useState} from "react";
import {getUser} from "../../api/user";
import {Alert} from "../../component/Alert";
import StringUtils from "../../utils/StringUtils";
import {setCookie, setId, setRealName, setToken} from "../../utils/cookie";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigator = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [type, setType] = useState("failure");
    const [alert, setAlert] = useState(false);
    const [failure, setFailure] = useState("");
    const [display, setDisplay] = useState(false);

    useEffect(() => {

    }, []);

    const handleInputChange = (e) => {
        setDisplay(false);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (StringUtils.isEmpty(formData.username) || StringUtils.isEmpty(formData.password)) {
            setDisplay(true);
            return;
        }
        getUser(formData).then(res => {
            if (res.code == 0) {
                setType("success");
                setToken(res.data.token);
                setId(res.data._id);
                setRealName(res.data.realName);
                navigator('/');
            } else {
                setType("failure");
                setFailure(res.message);
            }
            setAlert(true);
            setTimeout(() => setAlert(false), 2000);
        });
    }

    return (
        <div className="login">
        <div className="login-container">
            <h2>Library Login</h2>
            <div className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                    <p style={{display:display == true?"block":"none"}} className="red-color">Username and password cannot be blank</p>
                </div>
                <div class="form-group">
                    <button onClick={()=>handleSubmit()} className="theme-button">Login</button>
                </div>
            </div>
        </div>

            <Alert failure={failure} display={alert} type={type}/>
        </div>
    )
}

export default Login;
