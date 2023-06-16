import React, { useEffect, useState } from 'react';
import Container from '../../components/Shared/Container';
import SectionTitle from '../../components/Shared/SectionTitle';
import Instructor from '../../components/Instructor';
import { Zoom } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);


    useEffect(() => {
        fetch('https://eee-school.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                const inss = data.filter(ins => ins?.rol === 'instructor')
                setInstructors(inss);
            })
    }, [])

    return (
        <div className='my-20'>
            <Helmet>
                <title>EEE-SCHOOL - Popular Instructor</title>
            </Helmet>
            <Container>
                <SectionTitle
                    title="Popular Instructors"
                ></SectionTitle>
                <div className='grid md:grid-cols-2 gap-5'>
                    <Zoom>
                        {
                            instructors.slice(0, 6).map(instructor => <Instructor
                                key={instructor._id}
                                instructor={instructor}
                            ></Instructor>)
                        }
                    </Zoom>
                </div>
            </Container>
        </div>
    );
};

export default PopularInstructor;