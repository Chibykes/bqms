import {useState, useEffect, useContext} from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

    document.title = "Dashboard - QMS";


    const minDate = moment().format('YYYY-MM-DD');
    const maxDate = moment().add(7, 'days').format('YYYY-MM-DD');
    const [booking, setBooking] = useState({office: '', reason: '', date: minDate});
    const [offices, setOffices] = useState([]);

    const navigate = useNavigate();
    const {backend_url, setUser, setSidebarShow, Toast} = useContext(AppContext);
    const [track, setTrack] = useState(false);

    const data = {
        labels: ['Successful', 'Approved', 'Pending', 'Cancelled'],
        datasets: [
            {
                label: 'Appointments',
                data: track ? [track.success, track.approved, track.pending, track.cancelled] : [15, 3, 1, 5],
                backgroundColor: ['#47B685', '#3b82f6', '#ecff79', '#f6646f'],
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
                Toast('error', 'User must be logged in...');
                return navigate('/')
            };

            setUser(user);
            setTrack(data);
        });
    }

    useEffect(() => {
        
        updateTrack();

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
                return navigate('/')
            };

            setUser(user);
            console.log({data});
            setOffices(data);
        });
        
        return null;
    // eslint-disable-next-line
    }, [])

    const handleBooking = (e) => {
        e.preventDefault();

        fetch(`${backend_url}/appointments/new`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(booking),
        })
        .then(res => res.json())
        .then(({status, user, appointment}) => {
            if(!user) {
                Toast('error', 'User must be logged in...');
                return navigate('/')
            };

            Toast(status, 'Booking successful');
            setBooking({office: '', reason: '', date: minDate});
            setUser(user);
            updateTrack();
        });
    }

    return (<>
        <div className="grid grid-cols-6 lg:px-24 lg:mx-12">
            <Sidebar/>

            <div className="lg:col-span-5 col-span-6 lg:px-12">
                <Navbar/>

                <div className="px-6 pb-10">
                    <div className="py-8 grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-8">
                        <div className="p-5 border-none shadow-2xl border-zinc-500 rounded-lg lg:bg-white lg:text-black bg-black text-white">
                            <h1 className="font-bold text-6xl">
                                {track.all || 0}
                            </h1>
                            <p className="text-xs font-bold mt-3">
                                Total Appointments
                            </p>
                        </div>
                        <div className="p-5 border-none shadow-2xl border-zinc-500 rounded-lg">
                            <h1 className="font-bold text-6xl">
                                {track.success || 0}
                            </h1>
                            <p className="text-xs font-bold mt-3">
                                Successful Appointments
                            </p>
                        </div>
                        <div className="p-5 border-none shadow-2xl border-zinc-500 rounded-lg">
                            <h1 className="font-bold text-6xl">
                                {track.pending || 0}
                            </h1>
                            <p className="text-xs font-bold mt-3">
                                Pending Appointments
                            </p>
                        </div>
                    </div>

                    <h3 className="font-bold pb-5 pt-10 uppercase text-main-color">
                        Other Menu
                    </h3>
                    <div className="flex lg:flex-row flex-col lg:gap-20 gap-10">
                        <div className="lg:w-3/5 w-full">
                            <form className="block space-y-8 lg:p-10 p-8 text-center bg-white border-none border-zinc-300 rounded-lg shadow-2xl">
                                <h2 className="text-xl font-bold">
                                    Quick Appointments
                                </h2>
                                <div className="">
                                    <select className="block w-full px-5 py-3 border border-zinc-300 rounded-md capitalize" placeholder="Office for Visit" required
                                        onChange={
                                            (e) => setBooking({
                                                ...booking,
                                                office: e.target.value
                                            })
                                    }>

                                        <option value="" selected={!booking.office && 'true'}>
                                            Choose Office
                                        </option>
                                        {offices.map(({id,name}) => 
                                            <option value={name} key={id}>
                                                {name}
                                            </option>
                                        )}

                                    </select>
                                </div>
                                <div className="">
                                    <input type="text" className="block w-full px-5 py-3 border border-zinc-300 rounded-md" placeholder="Reason for Appointment"
                                        value={
                                            booking.reason
                                        }
                                        onChange={
                                            (e) => setBooking({
                                                ...booking,
                                                reason: e.target.value
                                            })
                                        }/>
                                </div>
                                <div className="">
                                    <input type="date" className="block w-full px-5 py-3 border border-zinc-300 rounded-md"
                                        onChange={
                                            (e) => setBooking({
                                                ...booking,
                                                date: e.target.value
                                            })
                                        }
                                        min={minDate}
                                        max={maxDate}/>
                                </div>
                                <button type="button" className=" block
                                    uppercase font-bold p-3 text-white bg-black rounded-lg
                                    hover:ring ring-gray-600 ring-offset-2 mx-auto w-full
                                "
                                    onClick={handleBooking}>
                                    Book Now
                                </button>
                            </form>
                        </div>


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
