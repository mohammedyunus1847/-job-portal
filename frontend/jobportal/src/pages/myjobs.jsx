import { useEffect, useState } from "react"

function Myjobs(){
    const[jobs,setJobs] = useState([]);
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState('');

    useEffect(()=>{
        async function fetchJobs() {
            try{
                setLoading(true);
                setError("");
                const token = localStorage.getItem("token");

                if(!token){
                throw new Error("Please Login as a reqruiter first")
                }

                const response = await fetch( "http://localhost:5000/api/job/myjobs",
                    {
                        headers:{
                            Authorization : `Bearer ${token}`
                        }
                    }
                );
                const data =await  response.json();
                console.log("My jobs API response:", data);
                if(!response.ok){
                    throw new Error(data.message || "Failed To Fetch Your Job")
                }  
              setJobs(data.data)  ;
            }catch(error){
                setError(error.message || "Something Went Wrong")
            }finally{
                setLoading(false)
            }
        }
        fetchJobs();
    },[])
    return(
        <div>
            <h1>My Posted Jobs</h1>
            <p>Manage the jobs you have posted.</p>

            {loading && <p>Loading your jobs...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && jobs.length === 0 && (
                <p>You haven't posted any jobs yet.</p>
            )}

            <div>
                {jobs.map((job) => (
                    <div key={job._id}>
                        <h3>{job.title}</h3>
                        <p>Company: {job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Job Type: {job.jobtype}</p>
                        <p>Salary: {job.salary}</p>
                    </div>
                ))}
            </div>
         </div>
    )
}

export default Myjobs;