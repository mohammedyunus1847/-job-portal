import { Navigate } from "react-router-dom";

function ProtectedRoute({children,allowedRole}){
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token){
        return <Navigate to="/login" replace/>
    }

    if(allowedRole && role?.toLowerCase() !== allowedRole.toLowerCase()){
        return <Navigate to="/" replace/>
    }

    return children;
}

export default ProtectedRoute;