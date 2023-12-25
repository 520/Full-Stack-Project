import "./index.css";
import {useState} from "react";

export const Comment = ({ onSubmit }) => {
    const [score, setScore] = useState('');
    const [comment, setComment] = useState('');

    const handleSelectChange = (event) => {
        setScore(event.target.value);
    };
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleClick = () => {
        onSubmit({score, comment});
    };

    return (
        <div className="comment-container">
            <h4>Comment: </h4><textarea value={comment} onChange={handleCommentChange} className="comment-textarea" placeholder="Write your comment..."></textarea>

            <h4>Rate: </h4><select className="rating-dropdown" value={score} onChange={handleSelectChange}>
            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
            <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
            <option value="3">&#9733;&#9733;&#9733;</option>
            <option value="2">&#9733;&#9733;</option>
            <option value="1">&#9733;</option>
        </select>

            <button className="submit-button" onClick={()=>handleClick()}>Submit</button>
        </div>
    );
};


