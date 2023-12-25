import "./index.css";
import {useEffect, useState} from "react";

export const Alert = ({display, success, failure, type}) => {

    useEffect(() => {

    }, []);

    return (
        <div className="alert">
            {display && type == "success" ? (
                <>
                <div style={{display: display ? "block":"none"}} id="successPopup" className="popup-container success">
                    {success ? success: "Success"}</div>
                </>
                ):(<>
                <div style={{display: display ? "block":"none"}} id="errorPopup" className="popup-container error">
                    {failure ? failure: "Failed"}</div>
            </>)}
        </div>
    )
}
