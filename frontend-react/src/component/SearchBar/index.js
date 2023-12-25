import "./index.css";
import {useState} from "react";
import {addHistory} from "../../api/history";
import {useDispatch} from "react-redux";
import {setGlobalVariable} from "../../redux/actions";

export const SearchBar = ({apiJson, onSubmit}) => {

    const dispatch = useDispatch();

    const updateGlobalVariable = (val) => {
        dispatch(setGlobalVariable(val));
    };
    const [keyword, setKeyword] = useState("");
    const handleClick = () => {
        updateGlobalVariable(keyword);
        let data = {
            userId: 2,
            keyword: keyword
        }
        addHistory(data).then(res => {
            console.log(res);
        });
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
