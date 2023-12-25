import './index.css';
import {useEffect, useState} from "react";
import {getHistory,listHistory,addHistory,deleteHistory,updateHistory} from "../../api/history";
import {Pagination} from "../../component/Pagination";
import {datetimeNormalization} from "../../utils/string";
import {getId} from "../../utils/cookie";

const History = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const loadData = (pageObj) => {
        getHistory(getId(), pageObj).then(r => {
            if (r.data.records) {
                setData(r.data.records);
            }
            if (r.data.currentPage) {
                setCurrentPage(r.data.currentPage);
                setTotalPages(r.data.totalPages);
            }
        });
    }

    const handleDelete = (id) => {
        deleteHistory(id).then(r => {
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
            <div className="history">
                <h3>Search History</h3>
                <table className="theme-table">
                    <thead>
                    <tr>
                        <th>Keyword</th>
                        <th>Create Date</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.keyword}</td>
                            <td>{datetimeNormalization(item.createTime)}</td>
                            <td><a href="# " onClick={()=>{handleDelete(item._id)}}>Delete</a></td>
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

export default History;
