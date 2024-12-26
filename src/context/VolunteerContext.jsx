import React, { createContext, useState } from 'react';
import axios from 'axios';
import AuthProvider from '../Providers/AuthProvider';

export const VolunteerProvider = createContext(null);

const VolunteerContext = ({children}) => {
    const handleAddVolunteer=async(data)=>{
        const res = await axios.post('http://localhost:5000/volunteer', data);
        console.log(res)
    }

    const provider = {handleAddVolunteer}
    return (
        <AuthProvider><VolunteerProvider.Provider value={provider}>
        {children}
    </VolunteerProvider.Provider></AuthProvider>
    );
};

export default VolunteerContext;