import { Link } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const ClassCard = ({ item }) => {
    const { _id, classImage, className, instructorName, availableSeats, price, enroll } = item;
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

    // console.log(users?.length > 0 , admin?.length > 0, item?.availableSeats === 0);

    return (
        <div className='shadow shadow-yellow-200 rounded-md p-5 hover:shadow-yellow-500'>
            <img className='rounded-md w-[150px] h-[120px]' src={classImage} alt="" />
            <h3 className='text-xl my-3'>Item: <span className='text-green-600 font-semibold'>{className}</span></h3>
            <h3 className='text-xl'>Instructor: <span className='text-purple-300'>{instructorName}</span></h3>
            <div className='flex my-3 justify-between font-semibold'>
                <span>Seats: <span className='text-pink-500'>{availableSeats}</span></span>
                <span>Enrolled: <span className='text-pink-500'>{enroll}</span></span>
                <span>Price: <span className='text-pink-500'>{price}</span></span>
            </div>

            <button className={`${(users.length > 0 || admin.length > 0 || item?.availableSeats === 0) ? 'bg-red-600 btn btn-disabled  text-white font-semibold py-2 px-4 rounded-md' : 'bg-gradient-to-r btn from-blue-500 to-purple-500 hover:from-pink-500 hover:to-red-500 text-white font-semibold py-2 px-4 rounded-md'}`}>
                <Link className='' to={`/classDetails/${item._id}`}>Select</Link>
            </button>

        </div>
    );
};

export default ClassCard;