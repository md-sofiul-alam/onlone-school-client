import { Link, Outlet } from 'react-router-dom';
import { FaPlusSquare, FaUsers, FaHome } from 'react-icons/fa';
import { HiClipboardList, HiOutlineAdjustments } from "react-icons/hi";
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const Dashboard = () => {
    const [admin, setAdmin] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const { user } = useAuth();

    const dashboard = ((window.location === 'http://127.0.0.1:5173/') || (window.location === 'https://arts-crafts-b7e57.web.app/'))
    console.log(dashboard)

    useEffect(() => {
        fetch('https://eee-school.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const findAdmin = data?.filter(adm => user?.email === adm?.email && adm?.role === "admin");
                setAdmin(findAdmin);
            })
    }, [])

    useEffect(() => {
        fetch('https://eee-school.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const findInstructors = data?.filter(instructor => user?.email === instructor?.email && instructor?.rol === "instructor");
                setInstructors(findInstructors);
            })
    }, [])

    return (
        <div className="drawer lg:drawer-open -mt-3">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />login
            <div className="drawer-content flex flex-col justify-start">
                {/* Page content here */}
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu font-semibold space-y-4 text-base p-4 w-80 h-full bg-[#121215] text-white">
                    <h3 className='pl-4 pt-8 text-4xl font-semibold text-white'>
                        {admin.length > 0 && instructors.length > 0 ? "Admin" : instructors.length > 0 ? "Instructor" : "User"} Panel
                    </h3>
                    {!dashboard &&
                        <h2 className='text-xl ms-4 text-info'>{(admin.length > 0 && instructors.length) > 0 ? user?.displayName : instructors.length > 0 ? user?.displayName : user?.displayName}</h2>
                    }
                    <hr className='ms-4 pb-8' />
                    {
                        admin.length > 0 && instructors.length > 0
                            ?
                            <>
                                <li className='hover:text-green-300'><Link to="/dashboard/addClass"><FaPlusSquare /> Add a Class</Link></li>
                                <li className='hover:text-green-300'><Link to="/dashboard/myClass"><HiClipboardList /> My Classes</Link></li>
                                <li className='hover:text-green-300'><Link to="/dashboard/manageClass"> <HiOutlineAdjustments />  Manage Classes</Link></li>
                                <li className='hover:text-green-300'><Link to="/dashboard/manageUsers"><FaUsers /> Manage Users</Link></li>
                            </>
                            : instructors.length > 0 ?
                                <>
                                    <li className='hover:text-green-300'><Link to="/dashboard/addClass"><FaPlusSquare /> Add a Class</Link></li>
                                    <li className='hover:text-green-300'><Link to="/dashboard/myClass"><HiClipboardList /> My Classes</Link></li>
                                </> :
                                <>
                                    <li className='hover:text-green-300'><Link to="/dashboard/selectedClass"><FaPlusSquare />My Selected Class</Link></li>
                                    <li className='hover:text-green-300'><Link to="/dashboard/enrolledClass"><HiClipboardList /> My Enrolled Class</Link></li>
                                    <li className='hover:text-green-300'><Link to="/dashboard/paymentHistory"><HiClipboardList /> Payment History</Link></li>
                                </>
                    }
                    <li className='hover:text-green-500 text-green-700'><Link to='/'><FaHome /> Home</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;