import { useEffect, useState } from "react";


function Applicants(){
    const[jobs,setJobs]=useState([]);
    const[selectedjob,setSelectedjo]=useState("")
    const[applicants,setApplicants] = useState([]);
    const[error,setError] = useState('')


    useEffect(()=>{
        async function FetchJobs(){
            try{
                
                    const token = localStorage.getItem("token");

                    if(!token){
                        throw new Error ("Please Login as Recruiter ");
                    }

                    const response = await fetch ("http://localhost:5000/api/job/myjobs",{
                        headers:{
                            Authorization:`Bearer ${token}`,
                        }
                    });

                    const data = await response.json();
                    console.log("Jobs API response:", data);
                    console.log("Jobs list:", data.data);

                    if(!response.ok){
                        throw new Error(data.message || "Failed to Dispaly Jobs")
                    }

                    setJobs(data.data)
            
            }
            catch(error)
            {
                setError(error.message || "Something Went Wrong")
            }
        }
        FetchJobs()
    },[])

    useEffect(()=>{
        if(selectedjob.length ===0){
            console.log("Selected Job ID:", selectedjob);
            return
        }

        async function FetchApplicants(){
            setError("")
            try{
                
                const token = localStorage.getItem("token");

                if(!token){
                    throw new Error("Please Login as Recruiter");
                }

                const response = await fetch(`http://localhost:5000/api/application/job/${selectedjob}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                });

                const data =await response.json();
                console.log("Applicants API response:", data);

                if(!response.ok){
                    throw new Error(data.message||"Failed To Display The Applicants")
                }

                setApplicants(data.data)
            }catch(error){
                setError(error.message || "Something Went Wrong")
            }
        }
        FetchApplicants()
    },[selectedjob]);

    async function handleStatusChange(applicationId,newStatus){
        setError("");
        try{
            const token = localStorage.getItem("token");

            if(!token){
                throw new Error("Please Login As a Recruiter");
            }

            const response = await fetch(`http://localhost:5000/api/application/${applicationId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({
                    status:newStatus,
                })
            });
            const data= await response.json();

            if(!response.ok){
                throw new Error(data.message || "Failed to update status")
            }

            setApplicants((previousApplicants)=>
            previousApplicants.map((applicant)=>
            applicant._id===applicationId ? {...applicant,status:data.data.status} : applicant))

        }catch(error){
            setError(error.message || "Something went wrong")
        }
    }
    return(
        <div>
            <h1>Applicants Dashboard</h1>

            {error && <p>{error}</p>}
            <select name="" id="" value={selectedjob}
            onChange={(e)=>setSelectedjo(e.target.value)}>
            <option value="">Select a Job</option>
            {jobs.map((job)=>(
                <option key={job._id} value={job._id}>
                    {job.title} — {job.company}
                </option>
            ))}
                
            </select>
            {applicants.map((applicant) => (
                <div key={applicant._id}>
                    <h3>{applicant.user?.Name}</h3>
                    <p>{applicant.user?.Email}</p>
                    <p>Status: {applicant.status}</p>
                    <select name="" id=""
                    value={applicant.status} onChange={(e)=>handleStatusChange(applicant._id,e.target.value)}>
                        <option value="Applied">Applied</option>
                        <option value="ShortListed">ShortListed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            ))}

            
        </div>
    )
}

export default Applicants;