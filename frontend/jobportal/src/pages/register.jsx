import { useState } from "react";
import {Link} from "react-router-dom"

function Register(){
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[role,setRole]=useState('jobseeker');
    

    const[message,setMessage]=useState('');
    const[loading,setLoading]=useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try{
            
            const response = await fetch("http://localhost:5000/api/auth/register",
                {
                    "method":"POST",
                    "headers":{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        Name:name,
                        Email:email,
                        Password:password,
                        Role:role
                    })
                }

            );
            const data=await response.json();
            
            if(!response.ok){
                throw new Error(data.message||'Registeration Failed');
            }
            setMessage(data.message || "Registration Successfull");

            setName('');
            setEmail('');
            setPassword('');
            setRole('jobseeker');
        }catch(error){
            setMessage(error.message || "Something Went Wrong");
        }finally{
            setLoading(false)
        }
    }
    return(
        <div>
            <h1> Create An Account </h1>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    
                    <input type="text" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div>
                    
                    <input type="email"  placeholder="Enter Your Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <div>
                   
                    <input type="password" placeholder="Enter Your Password"
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <div>
                    <select value={role} onChange={(e)=>{setRole(e.target.value)}}>
                        <option value="jobseeker">Job Seeker</option>
                        <option value="Recruiter">Recruiter</option>

                    </select>
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading?"registering":"Register"}
                </button>

                <p>
                    Already Have An Account? <Link to="/login">Login</Link>
                </p>

                <p>{message}</p>

            
            </form>

        </div>
        
    )
}

export default Register;