import { useContext } from 'react';
import SectionTitle from '../../components/Shared/SectionTitle';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import Button from '../../components/Shared/Button';
import { Helmet } from 'react-helmet-async';

const AddClass = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        fetch('https://eee-school.vercel.app/classes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId || !data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data Added Successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    reset()
                }
            })
    };
    return (

        <div className='w-2/3 mx-auto'>
            <Helmet>
                <title>EEE-SCHOOL - Add Class</title>
            </Helmet>
            <SectionTitle
                title="Add A Class"
            >
            </SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-5 mx-auto p-8 mb-8 bg-white rounded-lg shadow-lg">
                <div className="mb-6">
                    <label htmlFor="className" className="block text-sm font-bold mb-2">
                        Class Name
                    </label>
                    <input
                        type="text"
                        id="className"
                        placeholder='Class name'
                        className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('className', { required: true })}
                    />
                    {errors.className && <span className="text-red-500">Class Name is required</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="classImage" className="block text-sm font-bold mb-2">
                        Class Image url
                    </label>
                    <input
                        type="text"
                        id="classImage"
                        placeholder='Class image url'
                        className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('classImage', { required: true })}
                    />
                    {errors.classImage && <span className="text-red-500">Class Image url is required</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="instructorName" className="block text-sm font-bold mb-2">
                        Instructor Name
                    </label>
                    <input
                        defaultValue={user?.displayName}
                        type="text"
                        id="instructorName"
                        placeholder='Instructor name'
                        className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('instructorName')}
                        readOnly
                    />
                    {errors.instructorName && <span className="text-red-500">Instructor Name is required</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="instructorEmail" className="block text-sm font-bold mb-2">
                        Instructor Email
                    </label>
                    <input
                        defaultValue={user?.email}
                        type="email"
                        id="instructorEmail"
                        placeholder='Instructor email'
                        className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('instructorEmail')}
                        readOnly
                    />
                    {errors.instructorEmail && <span className="text-red-500">Instructor Email is required</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="availableSeats" className="block text-sm font-bold mb-2">
                        Available Seats
                    </label>
                    <input
                        type="number"
                        id="availableSeats"
                        placeholder='Write number seat'
                        className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('availableSeats', { required: true })}
                    />
                    {errors.availableSeats && <span className="text-red-500">Available Seats is required</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="price" className="block text-sm font-bold mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        placeholder='Course price'
                        className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('price', { required: true })}
                    />
                    {errors.price && <span className="text-red-500">Price is required</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="enroll" className="block text-sm font-bold mb-2">
                        Enroll
                    </label>
                    <input
                        type="text"
                        id="enroll"
                        placeholder='Enroll'
                        className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('enroll')} // Register the status field with React Hook Form
                        value= "0"
                        readOnly
                    />
                </div>
                <div className="mb-6">
                    {/* <button type="submit" className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button> */}
                    <Button value="Submit"></Button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;