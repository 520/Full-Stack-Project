import { createBrowserRouter } from 'react-router-dom'
import DashBoard from "../page/History";
import NotFound from "../page/NotFound";
import Main from "../page/Main";
import Login from "../page/Login";
import User from "../page/User";
import Fine from "../page/Fine";
import Borrowing from "../page/Borrowing";
import Books from "../page/Books";
import Book from "../page/Book";
import History from "../page/History";
import Save from "../page/Save";
import BookManagement from "../page/BookManagement";

const router = createBrowserRouter([
    {path: '', element: < Main/>,
        children: [
            {path: '', element: <Books/>},
            {path: 'book/:bookId', element: < Book/>},
            {path: 'user', element: < User/>},
            {path: 'fine', element: < Fine/>},
            {path: 'borrowing' , element: < Borrowing/>},
            {path: 'history' , element: < History/>},
            {path: 'saved', element: <Save/>},
            {path: 'books', element: < BookManagement/>},
        ]},
    {path: '404', element: < NotFound/>},
    {path: 'login', element: < Login/>},
    {path: '*', element: < NotFound/>}
])

export default router
