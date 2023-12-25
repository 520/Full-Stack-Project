import './index.css';
import {useEffect, useState} from "react";
import {getSave,listSave,addSave,deleteSave,updateSave} from "../../api/save";
import {Pagination} from "../../component/Pagination";
import {datetimeNormalization} from "../../utils/string";
import {useNavigate} from "react-router-dom";
import {getId} from "../../utils/cookie";
const Save = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    const loadData = (pageObj) => {
        getSave(getId(), pageObj).then(r => {
            if (r.data.records) {
                setData(r.data.records);
            }
            if (r.data.currentPage) {
                setCurrentPage(r.data.currentPage);
                setTotalPages(r.data.totalPages);
            }
        });
    }
    const handleVisit = (id) => {
        navigate("/book/"+id);
    }
    const handleDelete = (id) => {
        deleteSave(id).then(r => {
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
            <div className="save">
                <h3>My Favourites</h3>
                <table className="theme-table">
                    <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Create Date</th>
                        <th>Visit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{datetimeNormalization(item.createTime)}</td>
                            <td><a href="# " onClick={()=>{handleVisit(item.bookId)}}>Visit</a></td>
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

export default Save;
