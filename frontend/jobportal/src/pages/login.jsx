import { useState } from "react"

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);

    async function Handlesubmit(event){
        event.preventDefault();

        setLoading(true);
        setMessage('')

        try{
            const response = await fetch('http://localhost:5000/api/auth/login',
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"Application/json"
                    },
                    body:JSON.stringify({
                        Email:email,
                        Password:password
                    })
                },
                
            );
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message||"Login Failed")
            }
            localStorage.setItem("token",data.token);
            setMessage("Login Successfull");
           console.log(data);
           
        }catch(error){
            setMessage(error.message||"Something Went Wrong")
        }finally{
            setLoading(false);
        }
        
    }

    return(
        <form action="" onSubmit={Handlesubmit}>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            
            <div>
                <label htmlFor="">Password</label>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>

            <button type="submit" disabled={loading}>{loading? "Logging in....":"Login"}</button>
            
            <p>{message}</p>
            
        </form>
    )
}

export default Login;