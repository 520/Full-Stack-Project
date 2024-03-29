import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom'
import store from './redux/store';
import {Provider} from "react-redux";
import router from './router'

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      </Provider>
  </React.StrictMode>

);


reportWebVitals();
