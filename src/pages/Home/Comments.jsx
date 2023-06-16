import React from 'react';
import Container from '../../components/Shared/Container';
import { useState } from 'react';
import { useEffect } from 'react';
import Marquee from "react-fast-marquee";
import Comment from '../../components/Comment';
import SectionTitle from '../../components/Shared/SectionTitle';
import { Helmet } from 'react-helmet-async';

const Comments = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch('https://eee-school.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const users = data.filter(user => !(user?.role === 'admin' || user?.rol === "instructor"));
                setComments(users)
            })
    }, [])
    return (
        <div className='py-10'>
            <Helmet>
                <title>EEE-SCHOOL - Home</title>
            </Helmet>
            <Container>
                <SectionTitle title="Student's Comment"></SectionTitle>
                <Marquee
                    pauseOnHover
                >
                    {
                        comments.map(comment => <Comment
                            key={comment._id}
                            comment={comment}
                        ></Comment>)
                    }
                </Marquee>
            </Container>
        </div>
    );
};

export default Comments;