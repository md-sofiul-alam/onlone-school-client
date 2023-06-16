import { useEffect, useContext, useState } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle';
import { AuthContext } from '../../providers/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const MyClasses = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://eee-school.vercel.app/classes')
            .then(res => res.json())
            .then(data => {
                // const uEmail = user?.email;
                console.log(data)
                const myAllClass = data.filter(myClass => myClass?.instructorEmail === user?.email);
                setClasses(myAllClass)
            })
    }, [])

    return (
        <div className='mx-5'>
            <Helmet>
                <title>EEE-SCHOOL - My Classes</title>
            </Helmet>
            <SectionTitle title="My All Class">
                Total Class: {classes.length}
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table border">
                    {/* head */}
                    <thead className='text-white uppercase bg-pink-800'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Seats</th>
                            <th>Enroll</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Update</th>
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
                                                <img src={item?.classImage} alt="Instructor" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{item?.className}</div>
                                </td>
                                <td>{item?.availableSeats}</td>
                                <td>{item?.enroll}</td>
                                <td>$ {item?.price}</td>
                                <td className={item?.status && "text-info"}>{item?.status ? item?.status: "Pending"}</td>
                                <td>FeedBack</td>
                                <td>
                                    <button className='btn bg-green-600 border-0 text-white '><FaEdit/></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;