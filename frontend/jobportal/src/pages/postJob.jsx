import { useState } from "react"

function Postjob(){
    const [title,setTitle] = useState('');
    const [company,setCompany]= useState('');
    const [location,setLocation] =useState('');
    const [salary,setSalary] =useState('');
    const [jobtype,setJobtype]=useState('Fulltime');
    const [description,setDescription] = useState('');
    const [skills,setSkills] = useState('');
    const [message,setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            setMessage('')
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error("Please Login as a reqruiter first")
            }

            const response = await fetch ("http://localhost:5000/api/job",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({
                    title,
                    company,
                    location,
                    salary: Number(salary),
                    jobtype,
                    description,
                    skills: skills.split(",").map(skill => skill.trim()).filter(Boolean)
                })
            });
            const data =await response.json();

            if(!response.ok){
                throw new Error(data.message||"Failed To Post A Job ");
            }
            setMessage("Job Posted Successfully");
            setTitle("");
            setCompany("");
            setLocation("");
            setSalary("");
            setJobtype("FullTime");
            setDescription("");
            setSkills("");



        }catch(error){
            setMessage(error.message || "Something Went Wrong Try Again Later");
        }

    }
    return(
        <form onSubmit={handleSubmit}>
            <h1>Post a Job</h1>
            <div>
                <label htmlFor="" >Title</label>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
            </div>
            

            
            <div>
                <label htmlFor="">Company</label>
                <input type="text" value={company} onChange={(e)=>setCompany(e.target.value)} required />
            </div>
            
            <div>
                <label htmlFor="">Location</label>
                <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} required />
            </div>
            
            <div>
                <label htmlFor="">Salary</label>
                <input type="text" value={salary} onChange={(e)=>setSalary(e.target.value)} required />
            </div>
            
            <div>
                <label htmlFor="">Job-Type</label>
                <input type="text" value={jobtype} onChange={(e)=>setJobtype(e.target.value)} required />
            </div>
            
            <div>
                <label htmlFor="">Description</label>
                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required />
            </div>
            
            <div>
                <label htmlFor="">Skills</label>
                <input type="text" value={skills} onChange={(e)=>setSkills(e.target.value)} required />
            </div>
            

            <button >Submit</button>

            <p>{message}</p>

        </form>
    )
}

export default Postjob;