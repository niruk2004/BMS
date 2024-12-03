import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function ProtectedRoute({children}){

    const isLoggedin = useSelector(state=>state.auth.isLoggedin);
    if(!isLoggedin){
        return <Navigate to={'/auth'} replace/>
    }

    return children;
}