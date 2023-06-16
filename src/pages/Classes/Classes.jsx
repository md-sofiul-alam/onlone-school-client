import React, { useEffect, useState } from 'react';
import Container from '../../components/Shared/Container';
import SectionTitle from '../../components/Shared/SectionTitle';
import { Link, useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';


const Classes = () => {
    const data = useLoaderData();
    const approved = data.filter(item => item.status === "approved")

    const { user } = useAuth()

    const [axiosSecure] = useAxiosSecure();
    const [users, setUsers] = useState([]);

    const [admin, setAdmin] = useState([]);

    const getInstructor = async () => {
        const { data } = await axiosSecure.get('/users');
        const rol = data?.filter(ins => ins?.rol === "instructor");
        const insEmail = rol?.filter(ie => ie?.email === user?.email)
        setUsers(insEmail)
    }

    const getAdmin = async () => {
        const { data } = await axiosSecure.get('/users');
        const role = data?.filter(ins => ins?.role === "admin");
        const admEmail = role?.filter(ae => ae?.email === user?.email)
        setAdmin(admEmail)
    }

    useEffect(() => {
        getInstructor()
    }, [])

    useEffect(() => {
        getAdmin()
    }, [])

    return (
        <Container>
            <Helmet>
                <title>EEE-SCHOOL - Classes</title>
            </Helmet>
            <SectionTitle title="All Classes">Total Class: {approved.length}</SectionTitle>
            <div className="overflow-x-auto mb-10">
                <table className="table border">
                    {/* head */}
                    <thead className='text-white uppercase bg-pink-800'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Instructor Email</th>
                            <th>Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            approved?.map((item, i) => <tr key={item._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask rounded-full w-12 h-12">
                                                <img src={item?.classImage} alt="Instructor" className='w-20 h-20'/>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{item?.className}</div>
                                </td>
                                <td>
                                    <div className="font-bold">{item?.instructorName}</div>
                                </td>
                                <td>{item?.instructorEmail}</td>
                                <td>{item?.availableSeats}</td>
                                <td>{item?.enroll}</td>
                                <td>$ {item?.price}</td>
                                <td>
                                    <button className={`${(users.length > 0 || admin.length > 0 || item?.availableSeats === 0) ? 'bg-red-600 btn btn-disabled  text-white font-semibold py-2 px-4 rounded-md' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-pink-500 hover:to-red-500 btn text-white font-semibold py-2 px-4 rounded-md'}`}>
                                        <Link to={`/classDetails/${item._id}`}>Select</Link>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default Classes;