import { Link, NavLink } from "react-router";

const Navbar = () => {
    const navLinks = <>
        <li><NavLink to={"/books"}>All Books</NavLink></li>
        <li> <NavLink to={"/create-book"}>Add Book</NavLink></li>
        <li><NavLink to={"/borrow-summary"}>Borrow Summary</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-md border border-gray-200 max-w-7xl mx-auto mt-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow m-5">
                        {navLinks}
                    </ul>
                </div>
                <Link to={"/"} className="btn btn-ghost text-xl z-20">Book Horizon</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;