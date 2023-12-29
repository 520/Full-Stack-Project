import "./index.css";

const PopUp = (props) => {

    const handleClose = () => {
        props.onClose();
    }

    return (
        <div className="pop-up" style={{display: props.display ? "flex":"none"}}>
            <div><img onClick={handleClose} src="/images/close.png" />
                {props.children}</div>
        </div>
    )
}

export default PopUp;
