import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BsCheck } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const Appointments = () => {
    document.title = "Appointments - Admin";

    const navigate = useNavigate();
    const { backend_url, Toast, setSidebarShow, setUser } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);


    useEffect(() => {
        setSidebarShow(false);
        fetch(`${backend_url}/appointments/admin`, {
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

    const handleTools = (i, t, d, o) => {
        fetch(`${backend_url}/appointments/admin/${i}/${t}/${d}/${o}`, {
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
                <Sidebar />

                <div className="lg:col-span-5 col-span-6 lg:px-12">
                    <Navbar />


                    <div className="overflow-x-auto shadow-2xl my-24">
                        <table className="w-full rounded-lg overflow-hidden text-xs lg:text-sm">
                            <thead>
                                <tr className="bg-main-color text-white text-left">
                                    <th className="p-5">S/N</th>
                                    <th className="p-5">Name</th>
                                    <th className="p-5">Office</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5">Date</th>
                                    <th className="p-5">Tools</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(({id, user, office, status, date}, index) => {
                                    return(
                                        <tr className="bg-white hover:bg-zinc-100 capitalize" key={id}>
                                            <td className="p-5">{index + 1}</td>
                                            <td className="p-5">{user['name']}</td>
                                            <td className="p-5">{office}</td>
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
                                                    {status === "pending" &&
                                                        <span className="px-2 py-1 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white rounded-md" onClick={() => handleTools(id, 'approved', date, office)} title="Approve Appointment">
                                                            <BsCheck className="font-bold stroke" />
                                                        </span>
                                                    }

                                                    {status === "approved" &&
                                                        <span className="px-2 py-1 text-main-color cursor-pointer hover:bg-main-color hover:text-white rounded-md" onClick={() => handleTools(id, 'success')} title="Appointment Successful">
                                                            <BsCheck className="font-bold stroke" />
                                                        </span>
                                                    }

                                                    {status === "pending" &&
                                                        <span className="px-2 py-1 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-md" onClick={() => handleTools(id, 'cancelled')} title="Cancel Appointment">
                                                            <MdCancel className="font-bold stroke" />
                                                        </span>
                                                    }
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

            <Footer />

        </>
    );

}

export default Appointments;