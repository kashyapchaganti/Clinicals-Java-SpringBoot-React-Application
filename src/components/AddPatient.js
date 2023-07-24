import {React,useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { toast,ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

function AddPatient(){

    const[firstName,setFirstName] = useState('')
    const[lastName,setLastName] = useState('')
    const[age,setAge] = useState('')
    const navigate = useNavigate()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const handleSubmit=(event)=>{
     const data = {
        first_name:firstName,last_name:lastName,age:age
     }
     axios.post("http://localhost:8080/clinicalservices/api/patients", data).then((res)=>{
        toast.success("Patient Successfully Added",toastOptions)
        event.preventDefault();
        navigate("/");
     })
    }


        return (
        <>
        
        <div className="container">
                <h2>Create Patient:</h2>
                <form onSubmit={e => { e.preventDefault(); }}>
                First Name:<input type="text" name="firstName" onChange={e=>setFirstName(e.target.value)} align="left"/>
                Last Name:<input type="text" name="lastName" onChange={e=>setLastName(e.target.value)} align="left"/>
                Age:<input type="text" name="age" onChange={e=>setAge(e.target.value)} align="left"/>
                <button onClick={handleSubmit.bind(this)}>Confirm</button>
                </form>
                <Link  to={'/'}>Go Back</Link>
        </div>
        <ToastContainer/>
        </>
        )
}

export default AddPatient;






