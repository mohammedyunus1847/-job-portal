import { useEffect, useState } from "react";
import "../styles/home.css"
import {Link} from 'react-router-dom';

function Home (){
    const[jobs,setJobs] = useState([]);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState('');
    const [search,setSearch] = useState('');
    const [location,setlocation]=useState("");

    useEffect(()=>{
        console.log("Fetching jobs started");
        setLoading(true)
        async function Fetchjobs(){
            try{
                const response= await fetch("http://localhost:5000/api/job");
               

                const data = await response.json();
                

                if(!response.ok){
                    throw new Error(data.message||"Filed To Fetch Jobs");
                }
                setJobs(data.data)
                console.log("Jobs stored",data.data);
            }catch(error){
                setError(error.message || "Something Went Wrong")
            }finally{
                setLoading(false)
            }
            
            
        }
        Fetchjobs()

    },[])

    const filteredJobs = jobs.filter((job)=>{
        return(
            job.title.toLowerCase().includes(search.toLowerCase())&&
            job.location.toLowerCase().includes(location.toLowerCase())
        )
    })

    return(
        <div>
            <section className="hero">
                <h1>
                    Find Your <span>Dream Job</span>
                </h1>
                <p>
                    Discover Opoportunities that match your skills an build your future
                </p>
                <div className="search-bar ">
                    <input type="text" name="" id="" placeholder="Job Title or Skills"
                    value={search} onChange={(e)=>setSearch(e.target.value)} />

                    <input type="text" placeholder="Location"  value={location} onChange={(e)=>setlocation(e.target.value)} />

                    <button>Search Jobs</button>
                </div>
                <section>
                    <h2>Latest Jobs</h2>

                    {loading && <p>Loading Jobs...</p>}

                    {error && <p>{error}</p>}

                    {!loading && !error &&jobs.length ===0 && (
                        <p>No Jobs Available Right Now</p>
                    ) }

                    {!loading && !error && filteredJobs.length === 0 && (
                        <p>No matching jobs found.</p>
                     )}
                    
                    <div>
                        {filteredJobs.map((job)=>(
                            <Link to={`/jobs/${job._id}`}>
                                <div key={job._id} 
                                    className="job-card">
                                    <h3>{job.title}</h3>
                                    <p>{job.company}</p>
                                    <p>{job.location}</p>
                                    <p>{job.jobtype}</p>
                                </div>
                            </Link>
                            
                        ))}
                    </div>
                </section>
            </section>
        </div>
    )
}

export default Home;