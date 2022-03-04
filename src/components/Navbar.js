import bars from '../static/bars.svg';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const Navbar = () => {
    const { user, sidebarShow, setSidebarShow } = useContext(AppContext);

    return (
        <>
            <nav className="flex justify-between items-center py-5 lg:shadow-none shadow-xl px-6">
                <img src={bars} className="w-6 h-6" alt="" onClick={() => setSidebarShow(!sidebarShow)}/>
                <div className="flex justify-between items-center space-x-3">
                    <h3 className="text-sm font-bold capitalize">{user?.name}</h3>
                    <p className="w-7 h-7 rounded-full grid place-content-center bg-main-color uppercase font-light text-white">{
                        user?.name.charAt(0)
                    }</p>
                </div>
            </nav>
        </>
    );

}

export default Navbar;