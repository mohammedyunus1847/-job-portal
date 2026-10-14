import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

function JobDetails(){
    const {id} = useParams();

    const[job ,setJob]=useState(null);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState('');

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