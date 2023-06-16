import React from 'react';

const EnrolledCard = ({enr}) => {
    return (
        <div className="card w-80 bg-base-100 shadow-xl">
            <figure><img src={enr.classImage} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{enr.className}</h2>
                <p>Instructor: {enr.instructorName}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Play</button>
                </div>
            </div>
        </div>
    );
};

export default EnrolledCard;