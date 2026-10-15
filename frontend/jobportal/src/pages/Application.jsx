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
            {loading && <P>Loading Application.....</P>}

            {error && <p>{error}</p>}
            <div>
                {applications.map((application)=>{
                    <div key={application._id}>
                        <h3>
                            {application.Job?.title || "Job Title Unavailable"}
                        </h3>
                        <p>
                           cpmpany : {application.Job?.company || "Not Available"} 
                        </p>
                        <p>
                            Status: {application.status || "Pending"}
                        </p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Application;