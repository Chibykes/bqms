import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {BsTrash, BsPlus} from 'react-icons/bs';
import {Link, useNavigate} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const Offices = () => {
    document.title = "Offices - Admin";

    const {backend_url, setSidebarShow, Toast, setUser} = useContext(AppContext);
    const [offices, setOffices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setSidebarShow(false);
        
        fetch(`${backend_url}/offices`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(({data, user}) => {
            if(!user) {
                Toast('error', 'User must be logged in...');
                return navigate('/admin')
            };

            setUser(user);
            setOffices(data);
        });

        return null;
        // eslint-disable-next-line
    }, []);

    const handleDelete = (id) => {
        fetch(`${backend_url}/offices/delete/${id}`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(({data, user}) => {
            if(!user) {
                Toast('error', 'User must be logged in...');
                return navigate('/admin')
            };

            setUser(user);
            setOffices(data);
        });
    }

    return (<>
        <div className="grid grid-cols-6 lg:px-24 lg:mx-12">
            <Sidebar/>

            <div className="lg:col-span-5 col-span-6 lg:px-12">
                <Navbar/>

                <div className="wrapper px-5 my-16">
                    <div className="grid lg:grid-cols-6 grid-cols-2 my-4">
                        <Link to="add" className="bg-main-color rounded-md px-2 py-2 text-white flex justify-center items-center font-bold col-start-6">
                            <BsPlus className="stroke-2"/>
                            <span className="pl-2 text-sm">
                                Add Office
                            </span>
                        </Link>
                    </div>
                    <div className="overflow-x-auto shadow-2xl mb-24">
                        <table className="w-full rounded-lg overflow-hidden text-xs lg:text-sm">
                            <thead>
                                <tr className="bg-main-color text-white text-left">
                                    <th className="p-5">
                                        S/N
                                    </th>
                                    <th className="p-5">
                                        Office name
                                    </th>
                                    <th className="p-5">
                                        Tools
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {offices.map(({id, name}, index) => {
                                    return (
                                        <tr className="bg-white hover:bg-zinc-100 capitalize">
                                            <td className="p-5">
                                                {index + 1}
                                            </td>
                                            <td className="p-5">
                                                {name}
                                            </td>
                                            <td className="p-5">
                                                <div className="flex">
                                                    {/* <span className="px-2 py-1 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white rounded-md">
                                                        <BsEye className="font-bold"/>
                                                    </span> */}
                                                    {/* <span className="px-2 py-1 text-purple-500 cursor-pointer hover:bg-purple-500 hover:text-white rounded-md">
                                                        <BiPencil className="font-bold"/>
                                                    </span> */}
                                                    <span className="px-2 py-1 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-md" onClick={() => handleDelete(id)}>
                                                        <BsTrash className="font-bold"/>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr className="bg-white hover:bg-zinc-100">
                                    <td colSpan="4" className="p-5"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>


            </div>
        </div>

        <Footer/>

    </>);

}

export default Offices;
