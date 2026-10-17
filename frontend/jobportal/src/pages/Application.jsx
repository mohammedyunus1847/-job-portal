import { useEffect, useState } from "react"


function Application(){
    const [applications,setApplication] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');

    useEffect(()=>{
        async function FetchApplication() {
            try{
                setLoading(true);
                setError('')
                const token= localStorage.getItem("token");

                if(!token){
                    throw new Error("Please Login To View Your Application")
                }

                const response = await fetch('http://localhost:5000/api/application',
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );
                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.message || "Failed To Fetch The Application");
                }

                setApplication(data.data);
            }catch(error){
                setError(error.message || "Something Went Wrong")
            }finally{
                setLoading(false);
            }
            
            
        }
        FetchApplication()
    },[])

    return(
        <div>
            <h1>myapplication</h1>
            {!loading && !error && applications.length === 0 && (
                <p>You haven't applied for any jobs yet.</p>
            )}
            {loading && <p>Loading Application.....</p>}

            {error && <p>{error}</p>}
            <div>
                {applications.map((application)=>(
                    <div key={application._id}>
                        <h3>
                            {application.Job?.title || "Job Title Unavailable"}
                        </h3>
                        <p>
                           cpmpany : {application.Job?.company || "Not Available"} 
                        </p>
                        <p>
                            Location : {application.job?.location || "Not Available"}
                        </p>
                        <p>
                            Salary : {application.job?.salary || "Not Discolosed"}
                        </p>
                        <p>
                            Status : {""}
                            
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Application;