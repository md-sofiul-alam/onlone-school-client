import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../components/Shared/SectionTitle';
import { FaUserAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';


const ManageUsers = () => {
    const users = useLoaderData();

    const handleMakeInstructor = user => {
        fetch(`https://eee-school.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is as Instructor now.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleMakeAdmin = user => {
        fetch(`https://eee-school.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is as Admin now.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className='px-5'>
            {/* Site Title  */}
            <Helmet>
                <title>EEE-SCHOOL - Manage Users</title>
            </Helmet>

            {/* Section Title */}
            <SectionTitle title="Manage Users">Total Users: {users.length}</SectionTitle>

            {/* Manage User Body */}
            <div className="overflow-x-auto">
                <table className="table border">
                    {/* head */}
                    <thead className='text-white uppercase bg-pink-800'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Instructor</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className='text-center'>
                                    <form className='m-0'>
                                        <button
                                            className={`${user?.rol === "instructor" ? "btn btn-disabled border-info text-info" : "btn"}`}
                                            onClick={() => handleMakeInstructor(user)}
                                        >{user?.rol === 'instructor' ? "Instructor" : <FaUserAlt />}</button>
                                    </form>
                                </td>
                                <td className='text-center'>
                                    <form className='m-0'>
                                        <button
                                            className={`${user?.role === "admin" ? "btn btn-disabled border-primary text-primary" : "btn"}`}
                                            onClick={() => handleMakeAdmin(user)}
                                        >{user?.role === 'admin' ? 'Admin' : <FaUserAlt />}</button>
                                    </form>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;