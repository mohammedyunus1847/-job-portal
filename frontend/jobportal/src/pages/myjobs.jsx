import { useEffect, useState } from "react"

function Myjobs(){
    const[jobs,setJobs] = useState([]);
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState('');

    const[editingJobId,setEditingJobId] =useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editCompany, setEditCompany] = useState("");
    const [editLocation, setEditLocation] = useState("");
    const [editSalary, setEditSalary] = useState("");
    const [editJobtype, setEditJobtype] = useState("FullTime");
    const [editDescription, setEditDescription] = useState("");
    const [editSkills, setEditSkills] = useState("");
       
    function HandleEdits(job){
        setEditingJobId(job._id);
        setEditTitle(job.title);
        setEditCompany(job.company);
        setEditLocation(job.location);
        setEditSalary(job.salary);
        setEditJobtype(job.jobtype);
        setEditDescription(job.description);
        setEditSkills( Array.isArray(job.skills) ? job.skills.join(", ") : ""
);

    }
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
    },[]);

    async function Handledelete(jobId){
        const confirmed = window.confirm(
            "Are You Sure You Want To Delete This Job?"
        )
        if(!confirmed){
            return;
        }

        try{
           const token = localStorage.getItem("token");
           if(!token){
                throw new Error("Please Login as a reqruiter first")
           } 
           const response = await fetch( `http://localhost:5000/api/job/${jobId}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
           }
           );
           const data = await response.json();

           if(!response.ok){
            throw new Error(data.message || "Failed To Delete Job ")
           }
           setJobs((previousJobs)=>
            previousJobs.filter((job)=>job._id!==jobId)
           )

        }catch(error){
            setError(error.message || "Something Went Wrong")
        }
    }
    async function handleUpdate(e){
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");

            if(!token){
                throw new Error("Please Login as a Recruiter First");
            }

            const response = await fetch(`http://localhost:5000/api/job/${editingJobId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({
                    title:editTitle,
                    company: editCompany,
                    location:editLocation,
                    salary:editSalary,
                    jobtype:editJobtype,
                    description:editDescription,
                    skills:editSkills.split(",").map(skill =>skill.trim()).filter(Boolean)
                })
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Failed To Update Job")
            }

            setJobs((previousJob => 
                previousJob.map(job => 
                    job._id === editingJobId ? data.data : job
                )
            ));
            setEditingJobId(null);
            setError("")
            
        }catch(error){
            setError(error.message || "Something Went Wrong")
        }
    }

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
                        <button onClick={()=>HandleEdits(job)}>Edit Job</button>
                        <button onClick={()=>Handledelete(job._id)}>Delete Job</button>
                        
                        {editingJobId === job._id && (
                            <form onSubmit={handleUpdate}>
                                <h3>Edit Job</h3>

                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Job Title"
                                    required
                                />

                                <input
                                    value={editCompany}
                                    onChange={(e) => setEditCompany(e.target.value)}
                                    placeholder="Company"
                                    required
                                />

                                <input
                                    value={editLocation}
                                    onChange={(e) => setEditLocation(e.target.value)}
                                    placeholder="Location"
                                    required
                                />

                                <input
                                    type="number"
                                    value={editSalary}
                                    onChange={(e) => setEditSalary(e.target.value)}
                                    placeholder="Salary"
                                    required
                                />

                                <select
                                    value={editJobtype}
                                    onChange={(e) => setEditJobtype(e.target.value)}
                                >
                                    <option value="FullTime">Full Time</option>
                                    <option value="PartTime">Part Time</option>
                                    <option value="Internship">Internship</option>
                                </select>

                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder="Description"
                                    required
                                />

                                <input
                                    value={editSkills}
                                    onChange={(e) => setEditSkills(e.target.value)}
                                    placeholder="Skills separated by commas"
                                    required
                                />

                                <button type="submit">Save Changes</button>

                                <button
                                    type="button"
                                    onClick={() => setEditingJobId(null)}
                                >
                                    Cancel
                                </button>
                            </form>
                        )}

                    </div>
                ))}
            </div>
         </div>
    )
}

export default Myjobs;