import React from 'react';
import { Link } from 'react-router-dom';
import errorPhoto from '../assets/photos/images.error.png';

const Error = () => {
    return (
        <div className='w-11/12 mx-auto space-y-2'>
           <h2 className='text-3xl font-bold'>Page are not found 404!</h2>
           <Link to='/' className='btn bg-orange-700'>Back To Home Page</Link>
           <img className='w-11/12 rounded-md' src={errorPhoto} alt="Error" />
        </div>
    );
};

export default Error;