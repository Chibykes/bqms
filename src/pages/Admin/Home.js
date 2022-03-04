import React, { useState, useRef, useContext } from 'react';
import hero from '../../static/hero.png';
import {useSpring, animated} from 'react-spring';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    document.title = "Admin Home - QMS";

    const [active, toggle] = useState(false);
    const [adminLogin, setAdminLogin ] = useState({ 
        phone: '',
        password: '' 
    })

    const modalRef = useRef(null);

    const spring = useSpring({ 
        opacity: active ? 1 : 0,
        marginBottom: active ? 0 : -100,
    });

    const handleToggle = (e) => e.target.classList.contains('modal') && toggle(!active);
    const hideElem = (modal) => setTimeout(() => modal.current.style.display = "none", 500);
    const showElem = (modal) => modal.current.style.display = "grid";

    const {backend_url, Toast} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();            

        fetch(`${backend_url}/login`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(adminLogin)
        })
        .then(res => res.json())
        .then(({status, msg, user}) => {
            if(!user) return Toast(status, msg);
            if(user.role !== 'admin'){
                navigate('/admin');
                msg = "User is not authorized";
                return Toast('error', msg)
            }

            navigate('/admin/dashboard');
            msg = "Login Successful";
            Toast(status, msg)

        });
    }

    return(
        <>
            <div className="grid grid-cols-4 h-screen">
                <div className="
                    grid place-content-center col-span-full lg:col-span-2 lg:relative 
                    fixed top-0 left-0 right-0 bottom-0 opacity-10 lg:opacity-100
                ">
                    <img src={hero} className="w-full" alt="" />
                </div>
                <div className="
                    grid place-content-center text-center space-y-4 col-span-full lg:col-span-2
                    relative z-10
                ">
                    <div className="">
                        <h1 className="font-extrabold text-7xl text-main-color">ADMIN</h1>
                        <h6 className="font-bold text-sm">Babcock Queue Management System</h6>
                    </div>
                    <p className="text-xs py-3 w-72 mx-auto">
                        Admin Portal. Manage all your appointments booked on the site
                    </p>
                    <div className="">
                        <button className=" block cursor-pointer
                            uppercase font-bold p-3 text-white bg-black rounded-full
                            hover:ring ring-zinc-600 ring-offset-2 max-w-xs mx-auto w-72
                            " onClick={() => toggle(!active)}>
                            Login
                        </button>
                    </div>
                </div>
            </div>


            <div ref={modalRef} className={`${active ? showElem(modalRef) : hideElem(modalRef)} hidden modal fixed top-0 left-0 right-0 bottom-0 z-20 place-content-center`} onClick={handleToggle}>
                <animated.form style={spring} className={`block p-10 lg:w-full w-5/6 shadow-2xl mx-auto bg-white rounded-lg`}>
                    <div className="grid place-content-center text-center space-y-8">
                        <h2 className="text-2xl font-bold text-main-color">Management Area</h2>
                        <div className="">
                            <input className="block w-full py-3 px-5 border border-zinc-500 rounded-full" type="text" placeholder="Admin ID" value={adminLogin.phone} onInput={(e) => setAdminLogin({...adminLogin, phone: e.target.value})}/>
                        </div>
                        <div className="">
                            <input className="block w-full py-3 px-5 border border-zinc-500 rounded-full" type="password" placeholder="Password" value={adminLogin.password} onInput={(e) => setAdminLogin({...adminLogin, password: e.target.value})}/>
                        </div>
                        <button className=" block
                            uppercase font-bold p-3 text-white bg-black rounded-full
                            hover:ring ring-zinc-600 ring-offset-2 max-w-xs mx-auto w-72
                        " onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </animated.form>
            </div>
            
        </>
    );

}

export default Home;