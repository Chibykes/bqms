import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {useContext, useState} from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const NewOffice = () => {
    document.title = "New Office - Admin";

    const [name, setOffice] = useState('');
    const {backend_url, setSidebarShow, Toast, setUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleOffice = (e) => {
        e.preventDefault();

        setSidebarShow(false);
        
        fetch(`${backend_url}/offices`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({name})
        })
        .then(res => res.json())
        .then(({user}) => {
            if(!user) {
                Toast('error', 'User must be logged in...');
                return navigate('/admin')
            };
            
            setUser(user);
            setOffice('');
            Toast('success', 'New Office Added...');
        });
    }

    return (<>
        <div className="grid grid-cols-6 lg:px-24 lg:mx-12">
            <Sidebar/>

            <div className="lg:col-span-5 col-span-6 lg:px-12">
                <Navbar/>

                <div className="wrapper px-5 my-20">
                    <div className="">
                        <div className="lg:w-5/12 w-full mx-auto">
                            <form className="block space-y-8 lg:p-10 p-8 text-center bg-white border-none border-zinc-300 rounded-lg shadow-2xl">
                                <h2 className="text-xl font-bold">
                                    New Office
                                </h2>
                                <div className="">
                                    <input type="text" className="block w-full px-5 py-3 border border-zinc-300 rounded-md" placeholder="Office Name"
                                        value={name}
                                        onChange={
                                            (e) => setOffice(e.target.value)
                                        }/>
                                </div>
                                <button type="button" className=" block
                                    uppercase font-bold p-3 text-white bg-black rounded-lg
                                    hover:ring ring-gray-600 ring-offset-2 mx-auto w-full
                                "
                                    onClick={handleOffice}>
                                    Create Office
                                </button>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </div>

        <Footer/>

    </>);

}

export default NewOffice;
