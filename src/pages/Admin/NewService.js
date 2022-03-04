import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {useState} from 'react';

const NewService = () => {
    document.title = "New Services - Admin";

    const [service, setService] = useState('');

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
                                    New Service
                                </h2>
                                <div className="">
                                    <input type="text" className="block w-full px-5 py-3 border border-zinc-300 rounded-md" placeholder="Office Name"
                                        value={service}
                                        onChange={
                                            (e) => setService(e.target.value)
                                        }/>
                                </div>
                                <button type="button" className=" block
                                                                                uppercase font-bold p-3 text-white bg-black rounded-lg
                                                                                hover:ring ring-gray-600 ring-offset-2 mx-auto w-full
                                                                            "
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                            console.log(service);
                                        }
                                }>
                                    Create Service
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

export default NewService;
