import './index.css';
import {useEffect, useState} from "react";
import {listBook, deleteBook, addBook, updateBook} from "../../api/book";
import Pagination from "../../component/Pagination";
import {datetimeNormalization} from "../../utils/string";
import PopUp from "../../component/PopUp";
import Alert from "../../component/Alert";
import StringUtils from "../../utils/StringUtils";

const BookManagement = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [popup, setPopup] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        ISBN: '',
        genre: '',
        publicationYear: '',
        pdfUrl: '',
        description:'',
        createDate:'',
        edition:'',
        format:'',
        language:'',
        identifier:'',
        type:'',
        source:'',
        subjects:'',
        information:'',
    });
    const [type, setType] = useState("success");
    const [alert, setAlert] = useState(false);
    const [id, setId] = useState(null);
    const [blank, setBlank] = useState(false);
    const loadData = (pageObj) => {
        listBook(pageObj).then(r => {
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
        deleteBook(id).then(r => {
            loadData({currentPage, totalPages});
        });
    }

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
        loadData({currentPage, totalPages});
    }

    const handleInputChange = (e) => {
        setBlank(false);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) {
            if (StringUtils.isEmpty(formData.title)
                || StringUtils.isEmpty(formData.author)
                || StringUtils.isEmpty(formData.publicationYear)) {
                setBlank(true);
                return;
            }
        }
        try {
            if (id) {
                updateBook(formData).then(res => {
                    if (res.code == 0) {
                        setPopup(false);
                        setType("success");
                        loadData({currentPage, totalPages});
                    } else {
                        setType("failure");
                    }
                });
            } else {
                addBook(formData).then(res => {
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
            title: '',
            author: '',
            ISBN: '',
            genre: '',
            publicationYear: '',
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
            <div className="history">
                <h3>Books Management</h3>
                <button className="toggle-button" onClick={handleAdd}>+ ADD</button>
                <table className="theme-table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Create Time</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.ISBN}</td>
                            <td>{item.genre}</td>
                            <td>{item.publicationYear}</td>
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
                        Title:
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                    </label>
                    <label>
                        Author:
                        <input type="text" name="author" value={formData.author} onChange={handleInputChange} />
                    </label>
                    <label>
                        Year:
                        <input type="text" name="publicationYear" value={formData.publicationYear} onChange={handleInputChange} />
                    </label>
                    <label>
                        ISBN: (Optional)
                        <input type="text" name="ISBN" value={formData.ISBN} onChange={handleInputChange} />
                    </label>
                    <label>
                        Genre: (Optional)
                        <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} />
                    </label>

                    <label>
                        Description: (Optional)
                        <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                    </label>
                    <label>
                        Edition: (Optional)
                        <input type="text" name="edition" value={formData.edition} onChange={handleInputChange} />
                    </label>
                    <label>
                        Format: (Optional)
                        <input type="text" name="format" value={formData.format} onChange={handleInputChange} />
                    </label>
                    <label>
                        Language: (Optional)
                        <input type="text" name="language" value={formData.language} onChange={handleInputChange} />
                    </label>

                    <label>
                        Identifier: (Optional)
                        <input type="text" name="identifier" value={formData.identifier} onChange={handleInputChange} />
                    </label>
                    <label>
                        Type: (Optional)
                        <input type="text" name="type" value={formData.type} onChange={handleInputChange} />
                    </label>
                    <label>
                        Source: (Optional)
                        <input type="text" name="source" value={formData.source} onChange={handleInputChange} />
                    </label>
                    <label>
                        Subjects: (Optional)
                        <input type="text" name="subjects" value={formData.subjects} onChange={handleInputChange} />
                    </label>
                    <label>
                        Information: (Optional)
                        <input type="text" name="information" value={formData.information} onChange={handleInputChange} />
                    </label>
                    <p style={{color:'red',display:blank==true?"block":"none"}}>Title, author, year cannot be blank</p>
                    <button type="submit">Submit</button>
                </form>
            </PopUp>
            <Alert display={alert} type={type}/>
        </div>
    )
}

export default BookManagement;
