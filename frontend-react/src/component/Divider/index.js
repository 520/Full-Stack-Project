import "./index.css";

import "./index.css";

const Divider = (props) => {
    return (
        <div className="divider">
            <h3>{props.children}</h3><div className="divider-line"></div>
        </div>
    )
}

export default Divider;
