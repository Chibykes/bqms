import { createContext, useState } from 'react';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const AppContext = createContext();
const AppProvider = ({ children }) => {
    const backend_url = 'http://localhost:8080';
    // const backend_url = 'http://192.168.150.157:8080';
    const [user, setUser] = useState(null);
    const [sidebarShow, setSidebarShow] = useState(false);
    const Toast = (status, msg) => {
        Toastify({
            text: msg,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className : status === 'success' ? 'bg-gradient-to-tr from-main-color to-green-400' : 'bg-gradient-to-tr from-red-600 to-red-500'
        }).showToast();
    }


    return (
        <AppContext.Provider value={{backend_url, user, setUser, Toast, sidebarShow, setSidebarShow}}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };

