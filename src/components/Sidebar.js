import { useContext } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Sidebar = () => {

    const {pathname} = window.location;
    const navigate = useNavigate();
    const {backend_url, setUser, sidebarShow, Toast} = useContext(AppContext);

    const handleLogout = (a) => {
        fetch(`${backend_url}/log-out`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(({ status, user, msg }) => {
            Toast(status, msg);
            setUser(user);
            if(a === 'admin') return navigate('/admin');
            navigate('/');
        });
    }


    return (
        <>
            { !pathname.includes('admin/') ?
                <div className={`${sidebarShow ? null : 'hidden' } lg:block space-y-4 col-span-1 lg:mt-0 mt-16 lg:pt-24 lg:p-0 p-5 bg-white lg:relative fixed top-0 left-0 w-full lg:shadow-none shadow-xl`}>
                    <NavLink to="/dashboard" className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white">
                        Dashboard
                    </NavLink>
                    <NavLink to="/appointments" className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white">
                        Appointments
                    </NavLink>
                    {/* <NavLink to="/profile" className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white">
                        Profile
                    </NavLink> */}
                    <span className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white" onClick={() => handleLogout('index')}>
                        Logout
                    </span>
                </div>
                :
                <div className={`${sidebarShow ? null : 'hidden' } lg:block space-y-4 col-span-1 lg:mt-0 mt-16 lg:pt-24 lg:p-0 p-5 bg-white lg:relative fixed top-0 left-0 w-full lg:shadow-none shadow-xl`}>
                    <NavLink to="/admin/dashboard" className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white">
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/appointments" className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white">
                        Appointments
                    </NavLink>
                    <NavLink to="/admin/offices" className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white">
                        Manage Offices
                    </NavLink>
                    {/* <NavLink to="/admin/services" className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white">
                        Manage Services
                    </NavLink> */}
                    {/* <NavLink to="/admin/profile" className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white">
                        Profile
                    </NavLink> */}
                    <span className="block p-3 font-bold rounded-lg text-sm hover:bg-main-color hover:text-white" onClick={() => handleLogout('admin')}>
                        Logout
                    </span>
                </div>

            }
        </>
    );

}

export default Sidebar;