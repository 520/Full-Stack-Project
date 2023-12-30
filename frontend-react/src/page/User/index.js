import './index.css';
import {useEffect, useState} from "react";
import {listBook, deleteBook, addBook, updateBook} from "../../api/book";
import Pagination from "../../component/Pagination";
import {datetimeNormalization} from "../../utils/string";
import PopUp from "../../component/PopUp";
import Alert from "../../component/Alert";
import {addUser, deleteUser, listUser, listUSER, updateUser} from "../../api/user";

const User = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [popup, setPopup] = useState(false);
    const [formData, setFormData] = useState({
        id:'',
        libraryId:'',
        username:'',
        password:'',
        email:'',
        realName:'',
        phone:'',
        role:'',
        createTime: ''
    });
    const [type, setType] = useState("success");
    const [alert, setAlert] = useState(false);
    const [id, setId] = useState(null);
    const loadData = (pageObj) => {
        listUser(pageObj).then(r => {
            if (r.data.records) {
                setData(r.data.records);
            }
            if (r.data.currentPage) {
                setCurrentPage(r.data.currentPage);
                setTotalPages(r.data.totalPages);
            }
        });
    }

    useEffect(() => {
        loadData({currentPage, totalPages});
    }, []);

    const handleDelete = (id) => {
        deleteUser(id).then(r => {
            loadData({currentPage, totalPages});
        });
    }

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
        loadData({currentPage, totalPages});
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                updateUser(formData).then(res => {
                    if (res.code == 0) {
                        setPopup(false);
                        setType("success");
                        loadData({currentPage, totalPages});
                    } else {
                        setType("failure");
                    }
                });
            } else {
                addUser(formData).then(res => {
                    if (res.code == 0) {
                        setPopup(false);
                        setType("success");
                        loadData({currentPage, totalPages});
                    } else {
                        setType("failure");
                    }
                });
            }
        } catch (error) {
            setType("failure");
            console.error('Error submitting data:', error);
        } finally {
            setAlert(true);
            setTimeout(() => setAlert(false), 2000);
        }
    };

    const handleAdd = () => {
        setFormData({
            libraryId:'',
            username:'',
            password:'',
            email:'',
            realName:'',
            phone:'',
            role:''
        });
        setPopup(true);
        setId(null);
    }

    const handleEdit = (item) => {
        setPopup(true);
        setFormData(item);
        setId(item._id);
    }

    return (
        <div>
            <div className="user">
                <h3>User Management</h3>
                <button className="toggle-button" onClick={handleAdd}>+ ADD</button>
                <table className="theme-table">
                    <thead>
                    <tr>
                        <th>library id</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Real name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Create Time</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.libraryId}</td>
                            <td>{item.username}</td>
                            <td>******</td>
                            <td>{item.email}</td>
                            <td>{item.realName}</td>
                            <td>{item.phone}</td>
                            <td>{item.role}</td>
                            <td>{datetimeNormalization(item.createTime)}</td>
                            <td><a href="# " onClick={()=>{handleEdit(item)}}>Edit</a></td>
                            <td><a href="# " onClick={()=>{handleDelete(item._id)}}>Delete</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                { data.length == 0 ?
                    (<p className="no-result">No Result</p>) : (<Pagination totalPages={totalPages} onPageChange={handlePageChange} />)
                }
            </div>



            <PopUp display={popup} onClose={()=>setPopup(false)}>
                <form className="theme-form" onSubmit={handleSubmit}>
                    <label>
                        Library Id:
                        <input type="text" name="libraryId" value={formData.libraryId} onChange={handleInputChange} />
                    </label>
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password" value={formData.password} onChange={handleInputChange} />
                    </label>
                    <label>
                        Real Name:
                        <input type="text" name="realName" value={formData.realName} onChange={handleInputChange} />
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                    </label>
                    <label>
                        Phone:
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </label>
                    <label>
                        Role:
                        <input type="text" name="role" value={formData.role} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </PopUp>
            <Alert display={alert} type={type}/>
        </div>
    )
}

export default User;
