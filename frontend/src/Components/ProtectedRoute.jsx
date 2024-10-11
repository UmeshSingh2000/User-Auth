import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';


const ProtectRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/');
            return;
        }
        try {
            const decodeToken = jwtDecode(token)
            const currentTime = Date.now() / 1000;
            if (currentTime > decodeToken.exp) {
                localStorage.removeItem('token');
                alert('Session has been expired');
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            navigate('/')
        }
    }, [navigate])
    return children;
}
export default ProtectRoute;