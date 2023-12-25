import './index.css';
import {useEffect, useLayoutEffect, useState} from "react";
import {Divider} from "../../component/Divider";
import {useLocation} from "react-router-dom";
import { getBookById} from "../../api/book";
import {Comment} from "../../component/Comment";
import {addComment, getComment} from "../../api/comment";
import {Alert} from "../../component/Alert";
import {addBorrowing} from "../../api/borrowing";
import {addSave} from "../../api/save";
import {getId, getRealName} from "../../utils/cookie";
import ObjectUtils from "../../utils/ObjectUtils";

const Book = () => {

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState([]);
    const [book, setBook] = useState({});
    const [type, setType] = useState("success");
    const [alert, setAlert] = useState(false);
    const [isfavourite, setIsfavourite] = useState(false);
    const [isbook, setIsbook] = useState(false);
    const [ids, setIds] = useState({
        userId: '',
        bookId: '',
        title: ''
    });

    const loadData = (pageObj) => {
        let pathname = location.pathname;
        let bookId = pathname.replace("/book/","");
        let userId = getId();
        getBookById(bookId, pageObj).then(res => {
            if (res.code == 0) {
                setBook(res.data);
                setIds({userId, bookId, title: res.data.title, realName: getRealName()});
            }
        });
        getComment(bookId).then(res => {
            if (res.code == 0) {
                setData(res.data);
            }
        });
    }

    const handleSubmit = (data) => {
        data = ObjectUtils.addObjects(data, ids);;
        addComment(data).then(res => {
           if (res.code == 0) {
               setType("success");
               let pathname = location.pathname;
               let bookId = pathname.replace("/book/","");
               getComment(bookId).then(res => {
                   if (res.code == 0) {
                       setData(res.data);
                   }
               });
           } else {
               setType("failure");
           }
           setAlert(true);
           setTimeout(()=>setAlert(false),2000);
        });
    }

    const handleBook = () => {
        addBorrowing(ids).then(res => {
            if (res.code == 0) {
                setIsbook(true);
            }
        });
    }

    const handleFavourite = () => {
        addSave(ids).then(res => {
            if (res.code == 0) {
                setIsfavourite(true);
            }
        });
    }

    useEffect(() => {
        loadData({currentPage, totalPages});
    }, []);

    return (
        <div className="book">
            <h3>Book</h3>
            <div className="books-single">
                <img className="books-cover" src="/images/book-cover.png" />
                <div className="books-detail">
                    <span className="books-book">BOOK</span>
                    <span className="books-name">{book.title}</span>
                    <span className="books-author">{book.author}</span>
                    <span className="books-year">{book.publicationYear}</span>
                    <span className="books-available">Available at Charles Seale-Hayne Main Library</span>
                </div>
            </div>
            <div className="book-buttons">
            <a className={isbook==true?"theme-button-disable":"theme-button"} onClick={()=>handleBook()}>{isbook?"Booked":"Book"}</a>
            <a className={isfavourite==true?"theme-button-disable":"theme-button"} onClick={()=>handleFavourite()}>{isfavourite?"Added to favourite":"Add to favourite"}</a>
            <a className={book.pdfUrl?"theme-button":"theme-button-disable"}>{book.pdfUrl?"PDF":"PDF Unavailable"}</a>
            </div>
            <Divider>Details</Divider>
            <div className="book-detail">
                <div className="book-detail-rows">
                    <div className="book-detail-row">
                        <p className="width30">Description</p>
                        <p className="width70">{book.description ? book.description : '-'}</p>
                    </div>
                    <div className="book-detail-row">
                        <p className="width30">Upload Date</p>
                        <p className="width70">{book.createDate ? book.createDate : '-'}</p>
                    </div>
                    <div className="book-detail-row">
                        <p className="width30">Edition</p>
                        <p className="width70">{book.edition ? book.edition : '-'}</p>
                    </div>
                    <div className="book-detail-row">
                        <p className="width30">Format</p>
                        <p className="width70">{book.format ? book.format : '-'}</p>
                    </div>
                    <div className="book-detail-row">
                        <p className="width30">Language</p>
                        <p className="width70">{book.language ? book.language : '-'}</p>
                    </div>
                    <div className="book-detail-row">
                        <p className="width30">Identifier</p>
                        <p className="width70">{book.identifier ? book.identifier : '-'}</p>
                    </div>
                    <div className="book-detail-row">
                        <p className="width30">Type</p>
                        <p className="width70">{book.type ? book.type : '-'}</p>
                    </div>
                    <div className="book-detail-row">
                        <p className="width30">Source</p>
                        <p className="width70">{book.source ? book.source : '-'}</p>
                    </div>
                    <div className="book-detail-row">
                        <p className="width30">Subjects</p>
                        <p className="width70">{book.subjects ? book.subjects : '-'}</p>
                    </div>
                    <div className="book-detail-row">
                        <p className="width30">Information</p>
                        <p className="width70">{book.information ? book.information : '-'}</p>
                    </div>
                </div>
            </div>
            <Divider>Comments</Divider>

            <Comment onSubmit={handleSubmit} />


            <div className="comments-container">
                {data.map((item) => (
                <div className="comment">
                    <div className="comment-avatar">
                        <img src="/images/avatar.png" alt="User Avatar"/>
                    </div>
                    <div className="comment-content">
                        <div className="comment-user">{item.realName}</div>
                        <div className="comment-text">{item.comment}</div>
                        <div className="comment-date">Posted on: {item.createTime}</div>
                        <div className="comment-rating">
                            {item.score>0?(<span className="star">&#9733;</span>):(<></>)}
                            {item.score>1?(<span className="star">&#9733;</span>):(<></>)}
                            {item.score>2?(<span className="star">&#9733;</span>):(<></>)}
                            {item.score>3?(<span className="star">&#9733;</span>):(<></>)}
                            {item.score>4?(<span className="star">&#9733;</span>):(<></>)}
                        </div>
                    </div>
                </div>
                    ))}
            </div>
            <Alert display={alert} type={type}/>
        </div>
    )
}

export default Book;
