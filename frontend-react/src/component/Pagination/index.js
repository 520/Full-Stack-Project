import "./index.css";
import {useState} from "react";

const Pagination = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    className={`page-button ${currentPage === page ? 'selected' : ''}`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;

