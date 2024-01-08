import "./index.css";
import {useState} from "react";
import {addHistory} from "../../api/history";
import {useDispatch} from "react-redux";
import {setGlobalVariable} from "../../redux/actions";
import StringUtils from "../../utils/StringUtils";
import {getId} from "../../utils/cookie";

export const SearchBar = ({apiJson, onSubmit}) => {

    const dispatch = useDispatch();

    const updateGlobalVariable = (val) => {
        dispatch(setGlobalVariable(val));
    };
    const [keyword, setKeyword] = useState("");
    const handleClick = () => {
        if (!StringUtils.isEmpty(keyword)) {
            let data = {
                userId: getId(),
                keyword: keyword
            }
            addHistory(data).then(res => {
                console.log(res);
            });
        }
        updateGlobalVariable(keyword);
    }

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    }

    return (
        <div className="search-bar">
        <div className="search-box">
            <input onChange={handleInputChange} value={keyword} name="text" type="text" className="search-input" placeholder="Enter your search" />
                <button onClick={handleClick} className="search-button">Search</button>
        </div>
        </div>
    )
}
