// import wavy from '../static/wavy.svg';

const Footer = () => {

    return (
        <>
            <footer className="lg:hidden relative pt-14">
                {/* <img src={wavy} className="pt-5" alt="" /> */}
                <p className="text-center text-xs font-bold text-zinc-500 absolute left-0 right-0 bottom-4">
                    Queue Management System<br />
                    &copy; 2022
                </p>
            </footer>
        </>
    );

}

export default Footer;