import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {BsEye, BsTrash, BsPlus} from 'react-icons/bs';
import {BiPencil} from 'react-icons/bi';
import {Link} from 'react-router-dom';

const Offices = () => {

    return (<>
        <div className="grid grid-cols-6 lg:px-24 lg:mx-12">
            <Sidebar/>

            <div className="lg:col-span-5 col-span-6 lg:px-12">
                <Navbar/>

                <div class="wrapper px-5 my-16">
                    <div class="grid lg:grid-cols-5 grid-cols-2 my-4">
                        <Link to="add" className="bg-main-color rounded-md px-2 py-2 text-white flex justify-center items-center font-bold col-start-5">
                            <BsPlus className="stroke-2"/>
                            <span className="pl-2 text-sm">
                                Add Services
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
                                        Name
                                    </th>
                                    <th className="p-5">
                                        Office
                                    </th>
                                    <th className="p-5">
                                        Date
                                    </th>
                                    <th className="p-5">
                                        Tools
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white hover:bg-zinc-100">
                                    <td className="p-5">
                                        1
                                    </td>
                                    <td className="p-5">
                                        Adedoja Ibukun
                                    </td>
                                    <td className="p-5">
                                        Admin Office
                                    </td>
                                    <td className="p-5">
                                        22-01-2022
                                    </td>
                                    <td className="p-5">
                                        <div className="flex">
                                            <span className="px-2 py-1 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white rounded-md">
                                                <BsEye className="font-bold"/>
                                            </span>
                                            <span className="px-2 py-1 text-purple-500 cursor-pointer hover:bg-purple-500 hover:text-white rounded-md">
                                                <BiPencil className="font-bold"/>
                                            </span>
                                            <span className="px-2 py-1 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-md">
                                                <BsTrash className="font-bold"/>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
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
