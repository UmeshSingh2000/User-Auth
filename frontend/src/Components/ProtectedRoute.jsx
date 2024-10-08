import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const ProtectRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/');
            return;
        }
    }, [navigate])
    return children;
}
export default ProtectRoute;