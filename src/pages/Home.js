import React, {useState, useRef, useContext} from 'react';
import hero from '../static/hero.png';
import {useSpring, animated} from 'react-spring';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router';

const Home = () => {

    document.title = "Home - QMS";

    const { backend_url, Toast } = useContext(AppContext);
    const [active, toggle] = useState(false);
    const [regActive, regToggle] = useState(false);

    const regModalRef = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const matnoRef = useRef(null);
    const passwordRef = useRef(null);

    const [studentLogin, setStudentLogin] = useState({phone: '', password: ''})

    const [studentRegistration, setStudentRegistration] = useState({name: '', phone: '', matno: '', password: ''})

    const modalRef = useRef(null);

    const spring = useSpring({
        opacity: active ? 1 : 0,
        marginBottom: active ? 0 : -100
    });

    const regSpring = useSpring({
        opacity: regActive ? 1 : 0,
        marginBottom: regActive ? 0 : -100
    });

    const handleToggle = (e) => {
        e.target.classList.contains('modal') && toggle(!active);
        e.target.classList.contains('regmodal') && regToggle(!regActive);
    }

    const hideElem = (modal) => setTimeout(() => modal.current.style.display = "none", 500);
    const showElem = (modal) => modal.current.style.display = "grid";
    const handleInput = (prop, value) => {
        if (prop === 'phone') 
            return setStudentRegistration({
                ...studentRegistration,
                [prop]: value.replace(/[^0-9]/ig, '')
            });
        
        setStudentRegistration({
            ...studentRegistration,
            [prop]: value
        });
    };

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
            body: JSON.stringify(studentLogin)
        })
        .then(res => res.json())
        .then(({status, msg, user}) => {
            if(!user) return Toast(status, msg);

            navigate('/dashboard');
            msg = "Login Successful";
            Toast(status, msg)
        });
    }

    const handleRegistration = (e) => {
        e.preventDefault();

        fetch(`${backend_url}/register`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(studentRegistration)
        })
        .then(res => res.json())
        .then(({status}) => {
            if(status === "success"){
                let msg = "Registration Successful";
                Toast(status, msg);              

                regToggle(!regActive);
                setStudentRegistration({name: '', phone: '', matno: '', password: ''});

                setTimeout(() => toggle(!active), 1000);
            }
        });
    }


    return (<>
        <div className="grid grid-cols-4 h-screen">
            <div className="
                grid place-content-center col-span-full lg:col-span-2 lg:relative
                fixed top-0 left-0 right-0 bottom-0 opacity-10 lg:opacity-100
            ">
                <img src={hero}
                    className="w-full"
                    alt=""/>
            </div>
            <div className="
                grid place-content-center text-center space-y-4 col-span-full lg:col-span-2
                relative z-10
            ">
                <div className="">
                    <h1 className="font-extrabold text-7xl text-main-color">
                        B.Q.M.S
                    </h1>
                    <h6 className="font-bold text-sm">
                        Babcock Queue Management System
                    </h6>
                </div>
                <p className="text-xs py-3 w-72 mx-auto">
                    Book appointment with administrative offices and break the waiting time.
                </p>
                <div className="">
                    <button className=" block cursor-pointer
                        uppercase font-bold p-3 text-white bg-black rounded-full
                        hover:ring ring-zinc-600 ring-offset-2 max-w-xs mx-auto w-72
                    "
                        onClick={
                            () => toggle(!active)
                    }>
                        Login
                    </button>
                    <p className="text-xs py-3 w-72 mx-auto">
                        Not a member?
                        <span className="text-main-color font-bold cursor-pointer"
                            onClick={
                                () => regToggle(!regActive)
                        }>
                            &nbsp; Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>


        <div ref={modalRef}
            className={
                `${
                    active ? showElem(modalRef) : hideElem(modalRef)
                } hidden modal fixed top-0 left-0 right-0 bottom-0 z-20 place-content-center`
            }
            onClick={handleToggle}>
            <animated.form style={spring}
                className={`block p-10 lg:w-full w-5/6 shadow-2xl mx-auto bg-white rounded-lg`}>
                <div className="grid place-content-center text-center space-y-8">
                    <h2 className="text-2xl font-bold text-main-color">
                        Booking Area
                    </h2>
                    <div className="">
                        <input className="block w-full py-3 px-5 border border-zinc-500 rounded-full" type="text" placeholder="Phone Number"
                            value={
                                studentLogin.phone
                            }
                            onInput={
                                (e) => setStudentLogin({
                                    ...studentLogin,
                                    phone: e.target.value.replace(/[^0-9]/ig, '')
                                })
                            }/>
                    </div>
                    <div className="">
                        <input className="block w-full py-3 px-5 border border-zinc-500 rounded-full" type="password" placeholder="Password"
                            value={
                                studentLogin.password
                            }
                            onInput={
                                (e) => setStudentLogin({
                                    ...studentLogin,
                                    password: e.target.value
                                })
                            }/>
                    </div>
                    <button className=" block
                        uppercase font-bold p-3 text-white bg-black rounded-full
                        hover:ring ring-zinc-600 ring-offset-2 max-w-xs mx-auto w-72
                    "
                        onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </animated.form>
        </div>


        <div ref={regModalRef}
            className={
                `${
                    regActive ? showElem(regModalRef) : hideElem(regModalRef)
                } hidden regmodal fixed top-0 left-0 right-0 bottom-0 z-20 place-content-center`
            }
            onClick={handleToggle}>
            <animated.form style={regSpring}
                className="block space-y-8 p-10 lg:w-full w-5/6 text-center bg-white mx-auto shadow-2xl rounded-lg my-10"
                autoComplete="off">
                <h2 className="text-2xl font-bold text-main-color">
                    Register
                </h2>
                <div className="">
                    <input ref={nameRef}
                        type="text"
                        className="block w-full px-5 py-3 border border-gray-300 rounded-full"
                        placeholder="Name"
                        value={
                            studentRegistration.name
                        }
                        onInput={
                            () => handleInput('name', nameRef.current.value)
                        }/>
                </div>
                <div className="">
                    <input ref={phoneRef}
                        type="text"
                        className="block w-full px-5 py-3 border border-gray-300 rounded-full"
                        placeholder="Phone"
                        value={
                            studentRegistration.phone
                        }
                        onInput={
                            () => handleInput('phone', phoneRef.current.value)
                        }/>
                </div>
                <div className="">
                    <input ref={matnoRef}
                        type="text"
                        className="block w-full px-5 py-3 border border-gray-300 rounded-full"
                        placeholder="Mat. No"
                        value={
                            studentRegistration.matno
                        }
                        onInput={
                            () => handleInput('matno', matnoRef.current.value)
                        }/>
                </div>
                <div className="">
                    <input ref={passwordRef}
                        type="password"
                        className="block w-full px-5 py-3 border border-gray-300 rounded-full"
                        placeholder="Password"
                        value={
                            studentRegistration.password
                        }
                        onInput={
                            () => handleInput('password', passwordRef.current.value)
                        }/>
                </div>
                <button type="button" className=" block
                    uppercase font-bold p-3 text-white bg-black rounded-full
                    hover:ring ring-gray-600 ring-offset-2 max-w-xs mx-auto w-72
                "
                    onClick={handleRegistration}>
                    Sign Up
                </button>
            </animated.form>
        </div>
    </>);

}

export default Home;
