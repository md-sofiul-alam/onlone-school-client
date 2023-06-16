import React from 'react';

const Comment = ({ comment }) => {

    return (
        <div className='w-1/2 flex flex-col text-center border p-8 bg-slate-200 bg-opacity-40 rounded-2xl border-primary'>
            <img className='w-48 rounded-full mx-auto' src={comment.image} alt="" />
            <h2 className='my-4 text-3xl font-semibold text-pink-700'>{comment.name}</h2>
            <p className=''>Learning basic electricity enhances your understanding of a
                  fundamental aspect of modern life...</p>
            <a className="btn bg-green-600 text-white mt-2">See all</a>
        </div>
    );
};

export default Comment;