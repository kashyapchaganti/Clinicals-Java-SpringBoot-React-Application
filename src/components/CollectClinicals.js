import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom'


function CollectClinicals(){
    const [patientData,setPatientData] = useState()
    const {patientId} = useParams()
    const navigate= useNavigate();

    const[componentName,setComponentName] = useState('')
    const[componentValue,setComponentValue] = useState('')

    const [isLoading,setLoading]=useState(true)

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    useEffect(()=>{
        axios.get("http://localhost:8080/clinicalservices/api/patients/"+patientId).then((res)=>{
            console.log(res);
            setPatientData(res.data);
            setLoading(false);
        })
    });
 
    const handleSubmit=(event)=>{
        event.preventDefault()
     const data = {
        patientId:patientId,
        componentName:componentName,
        componentValue:componentValue

     }
     axios.post("http://localhost:8080/clinicalservices/api/clinicals",data).then(res=>{
        toast.success("Patient Data Added Successfully", toastOptions)
        navigate("/")
     })

    }

  
        return (<div>
                <h2>Patient Details:</h2>
                First Name: {!isLoading?patientData.first_name:""}<br/>
                Last Name: {!isLoading?patientData.last_name:""}<br/>
                Age: {!isLoading?patientData.age:""}
                <h2>Patient Clinical Data:</h2>
                <form>
                    Clinical Entry Type:<select onChange={e=>setComponentName(e.target.value)}>
                        <option>Select One</option>
                        <option value="bp">Blood Pressure(Sys/Dys)</option>
                        <option value="hw">Height/Weight</option>
                        <option value="heartrate">Heart Rate</option>
                        </select><br/>
                    Value:<input type="text" name="componentValue" onChange={e=>setComponentValue(e.target.value)}/><br/>
                    <button onClick={handleSubmit.bind(this)}>Confirm</button>
                </form>
                <ToastContainer/>
        </div>)
    }

export default CollectClinicals;






