import { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";

function TokenExpiryHandler(){
    const navigate = useNavigate();

    useEffect(()=>{
        let timer;
        function checkTokenExpiry(){
            clearTimeout(timer);
            const token = localStorage.getItem("token");

            if(!token) return;

            try{
                const payload = JSON.parse(atob(token.split(".")[1]));

                const expiresAt = payload.exp * 1000;
                const remaingTime = expiresAt = Date.now();

                if(remaingTime <=0){
                    localStorage.removeItem("token");
                    localStorage.removeItem("role")

                    window.dispatchEvent(new Event("authChange"));
                    navigate('/login',{replace:true});
                    return;
                }
                timer = setTimeout(()=>{
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    window.dispatchEvent(new Event("authChange"));
                    navigate("/login",{replace:true})
                },remaingTime)
            }
            catch(error){
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.dispatchEvent(new Event("authChange"));
                navigate("/login",{replace:true})
            }

        }
        checkTokenExpiry();  
        window.addEventListener("authChange",checkTokenExpiry)
        return()=>{
            clearTimeout(timer);
            window.removeEventListener("authChange",checkTokenExpiry);
    };
      
    },[navigate])
    return null;
}
export default TokenExpiryHandler;