import React from 'react';
import {useState, useRef} from 'react';

const Register = () => {

    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const matnoRef = useRef(null);
    const passwordRef = useRef(null);

    const [student, setStudent] = useState({name: '', phone: '', matno: '', password: ''})

    return (<>
        <form className="space-y-8 p-10 text-center w-full lg:w-1/3 mx-auto lg:shadow-2xl lg:rounded-lg my-10" autoComplete="off">
            <h2 className="text-2xl font-bold text-main-color">
                Register
            </h2>
            <div className="">
                <input ref={nameRef}
                    type="text"
                    className="block w-full px-5 py-3 border border-gray-300 rounded-full"
                    placeholder="Name"
                    value={
                        student.name
                    }
                    onInput={
                        () => setStudent({
                            ...student,
                            name: nameRef.current.value
                        })
                    }/>
            </div>
            <div className="">
                <input ref={phoneRef}
                    type="text"
                    className="block w-full px-5 py-3 border border-gray-300 rounded-full"
                    placeholder="Phone"
                    value={
                        student.phone
                    }
                    onInput={
                        () => setStudent({
                            ...student,
                            phone: phoneRef.current.value
                        })
                    }/>
            </div>
            <div className="">
                <input ref={matnoRef}
                    type="text"
                    className="block w-full px-5 py-3 border border-gray-300 rounded-full"
                    placeholder="Mat. No"
                    value={
                        student.matno
                    }
                    onInput={
                        () => setStudent({
                            ...student,
                            matno: matnoRef.current.value
                        })
                    }/>
            </div>
            <div className="">
                <input ref={passwordRef}
                    type="password"
                    className="block w-full px-5 py-3 border border-gray-300 rounded-full"
                    placeholder="Password"
                    value={
                        student.password
                    }
                    onInput={
                        () => setStudent({
                            ...student,
                            password: passwordRef.current.value
                        })
                    }/>
            </div>
            <button type="button" className=" block
                                        uppercase font-bold p-3 text-white bg-black rounded-full
                                        hover:ring ring-gray-600 ring-offset-2 max-w-xs mx-auto w-72
                                    "
                onClick={
                    () => console.log(student)
            }>
                Sign Up
            </button>
        </form>
    </>);
}

export default Register;
