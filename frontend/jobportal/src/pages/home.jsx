import "../styles/home.css"

function Home (){
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
                    <input type="text" name="" id="" placeholder="Job Title or Skills" />

                    <input type="text" placeholder="Location" />

                    <button>Search Jobs</button>
                </div>
            </section>
        </div>
    )
}

export default Home;