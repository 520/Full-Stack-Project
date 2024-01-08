import './index.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getBook, getBookByTitle} from "../../api/book";
import Pagination from "../../component/Pagination";

const Books = () => {

    const navigate = useNavigate();
    const globalVariable = useSelector(state => state.globalVariable);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData(globalVariable, {currentPage, totalPages});
    }, [globalVariable]);

    const handleClick = (bookId) => {
        navigate('/book/'+bookId);
    }

    const loadData = (title,pageObj) => {
        if (!title) title = '';
        getBookByTitle(title, pageObj).then(res => {
            if (res.code == 0) {
                setData(res.data.records);
                console.log(res);
            }
        });
    }

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
        loadData({currentPage, totalPages});
    }

    return (
        <>
        <h3>Result for {globalVariable}: </h3>
        <div className="books">
            <div className="books-container">
                <div className="books-list">
                    {data.map((item) => (
                    <div key={item._id} className="books-single" onClick={()=>handleClick(item._id)}>
                        <img className="books-cover" src="/images/book-cover.png" />
                        <div className="books-detail">
                            <span className="books-book">BOOK</span>
                            <span className="books-name">{item.title}</span>
                            <span className="books-author">{item.author}</span>
                            <span className="books-year">{item.publicationYear}</span>
                            <span className="books-available">Available at Charles Seale-Hayne Main Library</span>
                        </div>
                    </div>
                        ))}
                </div>
            </div>
        </div>
            { data.length == 0 ?
                (<p className="no-result">No Result</p>) : (<Pagination totalPages={totalPages} onPageChange={handlePageChange} />)
            }
            </>
    )
}

export default Books;
