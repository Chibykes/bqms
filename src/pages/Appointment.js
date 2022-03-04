import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {BsClockFill, BsCheck} from 'react-icons/bs';
import {TiCancel} from 'react-icons/ti';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../context/AppContext';
import {useNavigate, useParams} from 'react-router-dom';

import Barcode from 'react-barcode';
import { BiDotsHorizontal } from 'react-icons/bi';


const Appointment = () => {

    
    const navigate = useNavigate();
    const { backend_url, Toast, setSidebarShow, setUser } = useContext(AppContext);
    const [appointment, setAppointment] = useState({});
    const {id} = useParams();
    document.title = `Appointment ${id} - QMS`;

    useEffect(() => {
        setSidebarShow(false);
        fetch(`${backend_url}/appointments/${id}`, {
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
            setAppointment(data);
        });

        return null;
        
    // eslint-disable-next-line
    }, []);

    return (<>
        <div className="grid grid-cols-6 lg:px-24 lg:mx-12">
            <Sidebar/>

            <div className="lg:col-span-5 col-span-6 lg:px-12">
                <Navbar/>

                <div className="wrapper px-5 my-20">
                    <div className="">
                        <div className="bg-white rounded-lg p-8 shadow-2xl w-full lg:w-2/5 mx-auto space-y-8">
                            <div className="head">
                                <h2 className="text-4xl font-bold text-center">{appointment.queue_no ? appointment.queue_no.toString().padStart(3,'0') : 'Awaiting' }</h2>
                                <p className="text-xs text-center font-bold text-main-color">Queue Number</p>
                            </div>

                            <div className="body capitalize">
                                <p className="text-xs text-zinc-500">Office</p>
                                <h2 className="text-md font-bold mb-4">{appointment?.office}</h2>

                                <p className="text-xs text-zinc-500">Reason</p>
                                <h2 className="text-md font-bold mb-4">{appointment?.reason}</h2>

                                <p className="text-xs text-zinc-500">Date</p>
                                <h2 className="text-md font-bold mb-4">{appointment?.date}</h2>

                                {appointment.ewt && 
                                    <>
                                        <p className="text-xs text-zinc-500">Estimated Waiting Time</p>
                                        <h2 className="text-md font-bold mb-4">{appointment?.ewt || 15} mins</h2>
                                    </>
                                }
                                {appointment.est && 
                                    <>
                                        <p className="text-xs text-zinc-500">Estimated Service Time</p>
                                        <h2 className="text-md font-bold mb-4">{appointment?.est || 20} mins</h2>
                                    </>
                                }

                                <p className="text-xs text-zinc-500">Status</p>
                                <span className = {
                                    `font-semibold ${
                                            appointment.status === 'success' && 'bg-main-color text-white'
                                        } ${
                                            appointment.status === 'pending' && 'bg-yellow-300'
                                        } ${
                                            appointment.status === 'cancelled' && 'bg-red-500 text-white'
                                        } ${
                                            appointment.status === 'approved' && 'bg-blue-500 text-white'
                                        } px-2 p-1 rounded-md text-xs inline-flex items-center justify-start`
                                    }>

                                    {appointment.status === 'success' && <BsCheck className="inline mr-2 text-white" />}
                                    {appointment.status === 'approved' && <BiDotsHorizontal className="inline mr-2 text-white" />}
                                    {appointment.status === 'pending' && <BsClockFill className="inline mr-2 text-black" />}
                                    {appointment.status === 'cancelled' && <TiCancel className="inline mr-2 text-white" />}
                                    {appointment.status}
                                </span>
                            </div>

                            {appointment.queue_no && 
                                <div className="grid place-content-center">
                                    <Barcode value={appointment.queue_no} height="40px" width="2px" displayValue="false"/>
                                </div>
                            }
                        </div>
                    </div>
                </div>


            </div>
        </div>

        <Footer/>

    </>);

}

export default Appointment;
