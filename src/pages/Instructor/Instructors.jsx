import React, { useEffect, useState } from 'react';
import Container from '../../components/Shared/Container';
import SectionTitle from '../../components/Shared/SectionTitle';
import { Helmet } from 'react-helmet-async';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    // console.log(instructors);

    useEffect(() => {
        fetch('https://eee-school.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const inss = data.filter(ins => ins?.rol === 'instructor')
                setInstructors(inss);
            })
    }, [])

    return (
        <div className='my-20'>
            <Helmet>
                <title>EEE-SCHOOL - All Instructor</title>
            </Helmet>
            <Container>
                <SectionTitle
                    title="All Instructors"
                >
                    Total Instructor: {instructors.length}
                </SectionTitle>

                <div className="overflow-x-auto">
                    <table className="table border">
                        {/* head */}
                        <thead className='text-white uppercase bg-pink-800'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {instructors.map((instructor, i) => <tr key={instructor._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask rounded-full w-12 h-12">
                                                <img src={instructor.image} alt="Instructor" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{instructor.name}</div>
                                </td>
                                <td>
                                    <a href={`mailto:${instructor.email}`} className="text-blue-500 hover:underline">
                                        {instructor.email}
                                    </a>
                                </td>
                            </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
};

export default Instructors;