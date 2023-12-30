import './index.css';
import {useEffect, useState} from "react";
import {
    getBorrowing,
    listBorrowing,
    addBorrowing,
    deleteBorrowing,
    updateBorrowing,
    returnBorrowing
} from "../../api/borrowing";
import Pagination from "../../component/Pagination";
import {datetimeNormalization, datetimePlusDays} from "../../utils/string";
import {getId} from "../../utils/cookie";

const Borrowing = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const loadData = (pageObj) => {
        getBorrowing(getId(), pageObj).then(r => {
            if (r.data.records) {
                setData(r.data.records);
            }
            if (r.data.currentPage) {
                setCurrentPage(r.data.currentPage);
                setTotalPages(r.data.totalPages);
            }
        });
    }

    const handleReturn = (id) => {
        returnBorrowing(id).then(r => {
            loadData({currentPage, totalPages});
        });
    }
    useEffect(() => {
        loadData({currentPage, totalPages});
    }, []);

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
        loadData({currentPage, totalPages});
    }

    return (
        <div>
            <div className="borrowing">
                <h3>Borrowing History</h3>
                <table className="theme-table">
                    <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Borrowing Date</th>
                        <th>Due Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{datetimeNormalization(item.createTime)}</td>
                            <td>{datetimePlusDays(item.borrowDate, 90)}</td>
                            <td>{datetimeNormalization(item.returnDate)}</td>
                            { item.returnDate ? (<td>Returned</td>):
                                (<td><a href="# " onClick={()=>{handleReturn(item._id)}}>Return</a></td>)
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
                { data.length == 0 ?
                    (<p className="no-result">No Result</p>) : (<Pagination totalPages={totalPages} onPageChange={handlePageChange} />)
                }
            </div>
        </div>
    )
}

export default Borrowing;
