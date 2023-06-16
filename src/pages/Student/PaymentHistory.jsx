import SectionTitle from '../../components/Shared/SectionTitle';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth()

    const [carts, setCarts] = useState([])
    // console.log(carts);

    const [axiosSecure] = useAxiosSecure();
    const getCart = async () => {
        const data = await axiosSecure?.get(`/payments/${user?.email}`);
        setCarts(data?.data);
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div className='mx-5'>
            <SectionTitle title="Payment History"></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table border">
                    {/* head */}
                    <thead className='text-white uppercase bg-pink-800'>
                        <tr>
                            <th>#</th>
                            <th>Items</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            carts?.map((cart, i) => <tr key={cart._id}>
                                <th>{i + 1}</th>
                                <td>{((cart?.itemName).map((li, i) => <li key={i}>{li}</li>))}</td>
                                <td>$ {cart?.price}</td>
                                <td>{cart?.transactionId}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;