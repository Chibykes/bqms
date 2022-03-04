import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BsEye, BsTrash } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {

    document.title = "Appointments - QMS";

    const navigate = useNavigate();
    const { backend_url, Toast, setSidebarShow, setUser } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);


    useEffect(() => {
        setSidebarShow(false);
        fetch(`${backend_url}/appointments`, {
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
                return navigate('/')
            };

            setUser(user);
            setAppointments(data);
        });

        return null;

    // eslint-disable-next-line
    }, []);

    const handleDelete = (id) => {
        fetch(`${backend_url}/appointments/delete/${id}`, {
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
                return navigate('/')
            };

            setUser(user);
            setAppointments(data);
        });
    }

    return (
        <>
            <div className="grid grid-cols-6 lg:px-24 lg:mx-12">
                <Sidebar/>

                <div className="lg:col-span-5 col-span-6 lg:px-12">
                    <Navbar/>


                    <div className="wrapper px-5 my-24">
                        <div className="overflow-x-auto shadow-2xl">
                            <table className="w-full rounded-lg overflow-hidden text-xs lg:text-sm">
                                <thead>
                                    <tr className="bg-main-color text-white text-left">
                                        <th className="p-5">S/N</th>
                                        <th className="p-5">Office</th>
                                        <th className="p-5">Reason</th>
                                        <th className="p-5">Status</th>
                                        <th className="p-5">Date</th>
                                        <th className="p-5">Tools</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(({id, office, reason, status, date}, index) => {
                                        return(
                                            <tr className="bg-white hover:bg-zinc-100 capitalize" key={id}>
                                                <td className="p-5">{index + 1}</td>
                                                <td className="p-5">{office}</td>
                                                <td className="p-5">
                                                    <p className="w-11/12 truncate">
                                                        {reason}
                                                    </p>
                                                </td>
                                                <td className="p-5 lowercase">
                                                    <span className = {
                                                        `font-semibold 
                                                        ${status === 'success' && 'bg-main-color text-white'}
                                                        ${status === 'approved' && 'bg-blue-500 text-white'}
                                                        ${status === 'pending' && 'bg-yellow-300'}
                                                        ${status === 'cancelled' && 'bg-red-500 text-white'}
                                                        px-2 p-1 rounded-md text-xs`
                                                    }>
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="p-5">{date}</td>
                                                <td className="p-5">
                                                    <div className="flex">
                                                        <span className="px-2 py-1 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white rounded-md" title="View" onClick={() => navigate(`/appointments/${id}`)}>
                                                            <BsEye className="font-bold stroke" />
                                                        </span>
                                                        {/* <span className="px-2 py-1 text-purple-500 cursor-pointer hover:bg-purple-500 hover:text-white rounded-md" title="Edit" onClick={() => navigate(`/appointments/${id}`)}>
                                                            <BiPencil className="font-bold stroke" />
                                                        </span> */}

                                                        {status === 'pending' && 
                                                            <span className="px-2 py-1 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-md" title="Delete" onClick={() => handleDelete(id)}>
                                                                <BsTrash className="font-bold stroke" />
                                                            </span>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-white hover:bg-zinc-100">
                                        <td colSpan="6" className="p-5"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    


                </div>
            </div>

            <Footer/>
        </>
    );

}

export default Appointments;
