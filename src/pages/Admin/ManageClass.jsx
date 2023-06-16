import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../components/Shared/SectionTitle';
import { Helmet } from 'react-helmet-async';

const ManageClass = () => {
    const classes = useLoaderData();

    const handleApproved = user => {
        fetch(`https://eee-school.vercel.app/classes/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: ' Status Update Success.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }


    return (
        <div className='px-5'>
            <Helmet>
                <title>EEE-SCHOOL - Manage Class</title>
            </Helmet>
            <SectionTitle
                title="All Classes"
            >
                Total Classes {classes.length}
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table border">
                    {/* head */}
                    <thead className='text-white uppercase bg-pink-800'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor <br />Email</th>
                            <th>Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
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
                                    <div className="font-bold text-info">{item?.className}</div>
                                </td>
                                <td>
                                    <div className="font-bold">{item?.instructorName}</div>
                                    <span className='text-info'>{item?.instructorEmail}</span>
                                </td>
                                <td>{item?.availableSeats}</td>
                                <td className='text-info'>$ {item?.price}</td>
                                <td><button>{item?.status ? item?.status : "pending"}</button></td>
                                <td>
                                    <form className="btn-group btn-group-vertical m-0 lg:btn-group-horizontal">
                                        <button
                                            className={`${item?.status === "approved" ? "btn btn-disabled border-primary text-xs text-info btn-xs" : "btn btn-xs text-xs btn-outline"}`}
                                            onClick={() => handleApproved(item)}
                                        >{item?.status === 'approved' ? 'Approved' : "Approve"}
                                        </button>
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

export default ManageClass;