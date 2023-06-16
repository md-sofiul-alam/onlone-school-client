import React, { useContext, useEffect, useState } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle';
import { AuthContext } from '../../providers/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SelectedClass = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    // const token = localStorage.getItem('access-token');

    const getData = async () => {
        const { data } = await axiosSecure.get('/enrolled');
        const myAllClass = data.filter(myClass => myClass?.email === user?.email);
        setClasses(myAllClass)
        console.log(myAllClass);
    }

    useEffect(() => {
        getData()
    }, [])


    // useEffect(() => {
    //     fetch('https://eee-school.vercel.app/enrolled', {
    //         headers: {
    //             authorization: `bearer ${token}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data);
    //             const myAllClass = data.filter(myClass => myClass?.email === user?.email);
    //             setClasses(myAllClass)
    //         })
    // }, [])


    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://eee-school.vercel.app/enrolled/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your class has been deleted.',
                                'success'
                            )
                            const remaining = classes.filter(aClass => aClass._id !== id);
                            setClasses(remaining)
                        }
                    })
            }
        })
    }

    return (
        <div className='mx-5'>
            <Helmet>
                <title>EEE-SCHOOL - Selected Class</title>
            </Helmet>
            <SectionTitle title="My Selected Classes">Total Class: {classes.length}</SectionTitle>
            <div className="overflow-x-auto">
                <table className="table border">
                    {/* head */}
                    <thead className='text-white uppercase bg-pink-800'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            classes?.map((item, i) => <tr key={item._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask rounded-full w-12 h-12">
                                                <img src={item.classImage} alt="Instructor" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{item.className}</div>
                                </td>
                                <td>{item?.price}</td>
                                <td>
                                    <Link to="/dashboard/payment"><button className='btn bg-lime-600 border-0 text-white '>Pay</button></Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)} className='btn bg-red-600 border-0 text-white '><FaTrashAlt /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClass;