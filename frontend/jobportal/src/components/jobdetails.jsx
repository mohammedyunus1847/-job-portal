import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

function JobDetails(){
    const {id} = useParams();

    const[job ,setJob]=useState(null);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState('');
    const[apply,setApply] = useState(false);

    useEffect(()=>{
        async function Fetchjob(){
            try{
                setLoading(true);
                const response= await fetch(`http://localhost:5000/api/job/${id}`);

                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.message || "Failed TO Fetch The Job")
                }

                setJob(data.data);

            }catch(error){
                setError(error.message || "something Went Wrong");
            }finally{
                setLoading(false);
            }
        }
        Fetchjob()
    },[id])

    async function handleapply(){
        try{
            const token = localStorage.getItem("token");
            if(!token){
                setError("Please Login Before Applying");
                return;
            }

            const response =await  fetch(`http://localhost:5000/api/application/${id}`,
               {
                method:"POST",
                headers:{
                    Authorization:`Bearer ${token}`
                }
                
               } 
            );
            const data = await response.json();

            if(!response.ok){
                if(
                    data.message?.toLowerCase().includes("already")&&
                    data.message?.toLowerCase().includes("application")
                    ){
                        setApply(true);
                        setError('');
                        alert("You have already applied. Please wait for HR's reply.");
                        return;
                    }
                throw new Error(data.message || "Failed To Apply For The Job");
            }
            setApply(true)
            alert(data.message || "Application Submitted Successfully")
            
        }catch(error){
            setError(error.message||"Something Went Wrong")
        }
    }
    return(
        <div>
            
            {loading && <p>Loading Job Details.....</p>}

            {error && <p>{error}</p>}

            {!loading && !error && job && (
                <div>
                    <h2>{job.title}</h2>
                    <p>Company : {job.company}</p>
                    <p>Location : {job.location}</p>
                    <p>Salary : {job.salary}</p>
                    <p>Job-Type : {job.jobtype}</p>
                    <p>Description : {job.description}</p>
                    <button onClick={handleapply} disabled={apply}>{apply ? "Applied" : "Apply For The Job" }</button>
                    
                    {job.skills && job.skills.length >0 ? 
                    (<ul>
                        {job.skills.map((skill,index)=>{
                            <li key={index}>{skill}</li>
                        })}
                    </ul>): (
                        <p>No Skills Specified</p>
                    )}
                </div>
            )}
            
        
        </div>
    )
}

export default JobDetails;