import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "./Shared/SectionTitle";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Container from "./Shared/Container";

const ClassDetails = () => {
    const { user } = useContext(AuthContext)
    const email = user?.email;

    const data = useLoaderData();

    const { _id, instructorName, className, classImage, availableSeats, instructorEmail, price, enroll } = data;
    const enrolledData = { id: _id, instructorName, className, classImage, email, price };
    const handleSubmit = (e) => {
        e.preventDefault();

        const availableNumber = parseFloat(availableSeats);
        if (availableNumber == 0) {
            return Swal.fire('Seat Not Available')
        }
        const nowAvailable = availableNumber - 1;
        const enrolled = parseInt(enroll) + 1;

        const updatedSeats = { availableSeats: nowAvailable, enroll: enrolled }

        // send data to server
        fetch(`https://eee-school.vercel.app/classes/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedSeats)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                enrolledClass(enrolledData)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Toy Update successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            });

    }

    const enrolledClass = data => {
        fetch('https://eee-school.vercel.app/enrolled', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        <Container>
            <SectionTitle title="Class Details"> {className} </SectionTitle>

            <div className="card w-96 glass mx-auto mb-10">
                <figure><img src={classImage} alt="car!" /></figure>
                <div className="card-body">
                    <div className="overflow-x-auto">
                        <table className="table border">
                            {/* head */}
                            <thead>
                                <tr className="text-sm bg-pink-600 text-white">
                                    <th>Key</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>Course:</th>
                                    <td>
                                        <h2 className="card-title text-pink-600">{className}</h2>
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>Instructor</th>
                                    <td>
                                        <h2 className="card-title text-pink-600">{instructorName}</h2>
                                    </td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>Available Seats</th>
                                    <td>
                                        <h2 className="card-title text-pink-600">{availableSeats}</h2>
                                    </td>
                                </tr>
                                {/* row 4 */}
                                <tr>
                                    <th>Ins. Email</th>
                                    <td>
                                        <a href={`mailto:${instructorEmail}`} className="text-blue-500 hover:underline">
                                            Contact Instructor
                                        </a>
                                    </td>
                                </tr>
                                {/* row 5 */}
                                <tr>
                                    <th>Price</th>
                                    <td>
                                        <h2 className="card-title text-pink-600">$ {price}</h2>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <form>
                        {/* {availableSeats !== 0 && <div className="form-control hidden w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-yellow-500">Get a seat</span>
                            </label>
                            <input type="text" readOnly name="aSeat" value="1" placeholder="Type here" className="input input-bordered bg-opacity-0 input-primary w-full max-w-xs" />
                        </div>} */}
                        <button onClick={handleSubmit} className="btn  btn-secondary">Select</button>

                    </form>
                </div>
            </div>
        </Container>
    );
};

export default ClassDetails;