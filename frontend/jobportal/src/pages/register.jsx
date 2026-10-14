import { useState } from "react";

function Register(){
    const[name,setName]=useState('');
    return(
        <div>
            <h1> Create An Account </h1>
            <form action="">
                <div>
                    <label htmlFor="">Enter Your Name : </label>
                    <input type="name" placeholder="Name....."/>
                </div>

                <div>
                    <label htmlFor="">Enter Your Email : </label>
                    <input type="email"  placeholder="Email....."/>
                </div>

                <div>
                    <label htmlFor="">Enter Your Password : </label>
                    <input type="password" placeholder="Password....."/>
                </div>

                <div>
                    <label htmlFor=""></label>
                </div>
            
            </form>

        </div>
        
    )
}

export default Register;