import React from 'react';
import Container from '../../components/Shared/Container';
import SectionTitle from '../../components/Shared/SectionTitle';
import CheckOutForm from './CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    const { user } = useAuth();
    const [cart, setCart] = useState();
    const [axiosSecure] = useAxiosSecure();

    // console.log(amount);


    const getData = async () => {
        const { data } = await axiosSecure.get('/enrolled');
        const payments = data?.filter(payment => payment?.email === user?.email);
        setCart(payments)
    }

    useEffect(() => {
        getData()
    }, [])


    // const total = amount.reduce((sum, item) => sum + item.price, 0)
    // const price = parseFloat(total.toFixed(2))
    // console.log(total);

    const price = 20;



    return (
        <Container>
            <Helmet>
                <title>EEE-SCHOOL - Payment</title>
            </Helmet>
            <SectionTitle title="Payment"></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckOutForm price={price} cart={cart}></CheckOutForm>
            </Elements>
        </Container>
    );
};

export default Payment;