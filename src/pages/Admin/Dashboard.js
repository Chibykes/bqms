import {useContext, useState, useEffect} from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';


const Dashboard = () => {
    document.title = "Dashboard - Admin";

    const navigate = useNavigate();
    const {backend_url, setUser, setSidebarShow, Toast} = useContext(AppContext);
    const [track, setTrack] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const data = {
        labels: ['Successful', 'Pending', 'Cancelled'],
        datasets: [
            {
                label: 'Appointments',
                data: track ? [track.success, track.pending, track.cancelled] : [15, 3, 1],
                backgroundColor: ['#47B685', '#ecff79', '#f6646f'],
                hoverOffset: 4
            }
        ]
    };

    const updateTrack = () => {
        setSidebarShow(false);
        fetch(`${backend_url}/track`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(({data ,user}) => {
            if(!user) {
                Toast('error', 'Admin must be logged in...');
                return navigate('/admin')
            };

            setUser(user);
            setTrack(data);
        });
    }

    useEffect(() => {
        
        updateTrack();
        fetch(`${backend_url}/appointments/admin`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(({data ,user}) => {
            if(!user) {
                Toast('error', 'Admin must be logged in...');
                return navigate('/admin')
            };

            console.log(data);
            setAppointments(data);
        });
        
        return null;
    // eslint-disable-next-line
    }, [])

    return (<>
        <div className="grid grid-cols-6 lg:px-24 lg:mx-12">
            <Sidebar/>

            <div className="lg:col-span-5 col-span-6 lg:px-12">
                <Navbar/>

                <div className="px-6 pb-10">
                    <div className="py-8 grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-8">
                        <div className="p-5 border-none shadow-2xl border-zinc-500 rounded-lg lg:bg-white lg:text-black bg-black text-white">
                            <h1 className="font-bold text-6xl">
                                {track.all}
                            </h1>
                            <p className="text-xs font-bold mt-3">
                                Total Appointments
                            </p>
                        </div>
                        <div className="p-5 border-none shadow-2xl border-zinc-500 rounded-lg">
                            <h1 className="font-bold text-6xl">
                                {track.pending}
                            </h1>
                            <p className="text-xs font-bold mt-3">
                                Pending Appointments
                            </p>
                        </div>
                        <div className="p-5 border-none shadow-2xl border-zinc-500 rounded-lg">
                            <h1 className="font-bold text-6xl">
                                {track.all_student}
                            </h1>
                            <p className="text-xs font-bold mt-3">
                                Total Students
                            </p>
                        </div>
                    </div>

                    <h3 className="font-bold pb-5 pt-10 uppercase text-main-color">
                        Other Menu
                    </h3>
                    <div className="flex lg:flex-row flex-col lg:gap-10">
                        <div className="lg:w-3/5 w-full overflow-x-auto shadow-2xl">
                            <table className="w-full rounded-lg overflow-hidden text-xs lg:text-sm">
                                <thead>
                                    <tr className="bg-main-color text-white">
                                        <th className="p-5">
                                            S/ID
                                        </th>
                                        <th className="p-5">
                                            Name
                                        </th>
                                        <th className="p-5">
                                            Status
                                        </th>
                                        <th className="p-5">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(({ id, status, user, date }, index) => {
                                        return (
                                            <tr className="bg-white hover:bg-zinc-100 capitalize" key={id}>
                                                <td className="p-5">
                                                    {index + 1}
                                                </td>
                                                <td className="p-5">
                                                    {user.name}
                                                </td>
                                                <td className="p-5">
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
                                                <td className="p-5">
                                                    {date}
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
                            {/* <form className="block space-y-8 lg:p-10 p-8 text-center bg-white border-none border-zinc-300 rounded-lg shadow-2xl">
                                    <h2 className="text-xl font-bold">Quick Appointments</h2>
                                    <div className="">
                                        <select className="block w-full px-5 py-3 border border-zinc-300 rounded-md" placeholder="Office for Visit" onChange={(e) => setBooking({...booking, office: e.target.value})}>

                                            <option value="Administrative Office">Administrative Office</option>
                                            <option value="Administrative Office 2">Administrative Office 2</option>
                                            <option value="Administrative Office 3">Administrative Office 3</option>
                                            <option value="Administrative Office 4">Administrative Office 4</option>

                                        </select>
                                    </div>
                                    <div className="">
                                        <input type="text" className="block w-full px-5 py-3 border border-zinc-300 rounded-md" placeholder="Reason for Appointment" value={booking.reason} onChange={(e) => setBooking({...booking, reason: e.target.value})} />
                                    </div>
                                    <div className="">
                                        <input type="date" className="block w-full px-5 py-3 border border-zinc-300 rounded-md" onChange={(e) => setBooking({...booking, date: e.target.value})} min={minDate} max={maxDate} />
                                    </div>
                                    <button type="button" className=" block
                                        uppercase font-bold p-3 text-white bg-black rounded-lg
                                        hover:ring ring-gray-600 ring-offset-2 mx-auto w-full
                                    " onClick={(e) => { e.preventDefault(); console.log(booking);}}>
                                        Book Now
                                    </button>
                                </form> */} </div>


                        <div className="lg:w-2/5 w-full shadow-2xl">
                            <div className="px-5 py-10 text-center">
                                <h1 className="font-bold">
                                    Appointments
                                </h1>
                                <Doughnut data={data}
                                    width={400}
                                    height={400}/>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>

        <Footer/>
    </>);

}

export default Dashboard;
