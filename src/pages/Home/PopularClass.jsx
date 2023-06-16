import React, { useEffect, useState } from 'react';
import Container from '../../components/Shared/Container';
import SectionTitle from '../../components/Shared/SectionTitle';
import ClassCard from '../../components/ClassCard';
import { Link } from 'react-router-dom';
import { Rotate } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';

const PopularClass = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('https://eee-school.vercel.app/classes')
            .then(res => res.json())
            .then(data => {
                const approved = data.filter(item => item.status === "approved")
                const sorted = approved.sort((b, a) => parseFloat(a?.enroll) - parseFloat(b?.enroll))
                setClasses(sorted.slice(0, 6))
            })
    }, [])

    return (
        <Container>
            <Helmet>
                <title>EEE-SCHOOL - Popular Class</title>
            </Helmet>
            <SectionTitle
                title="Popular Classes"
            ></SectionTitle>
            <div className='grid md:grid-cols-3 gap-7'>
                <Rotate>
                    {
                        classes?.map(item => <ClassCard
                            key={item._id}
                            item={item}
                        ></ClassCard>)
                    }
                </Rotate>
            </div>
            <div className='flex justify-center mt-12'>
                <Link to='/classes' className='bg-green-600 hover:from-pink-500 hover:to-red-500 text-white font-semibold py-2 px-4 rounded-md'>All Classes</Link>
            </div>
        </Container>
    );
};

export default PopularClass;