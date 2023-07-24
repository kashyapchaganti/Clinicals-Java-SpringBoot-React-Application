import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home(){
 
    const [patientData,setPatientData] = useState([])
    const [isLoading,setLoading]=useState(true)


    useEffect(()=>{
      axios.get("http://localhost:8080/clinicalservices/api/patients").then((res)=>{
        setPatientData(res.data);
        setLoading(false);
      })
    },[])

        return (<div>
            <h2>Patients:</h2>
            <table align='center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
{!isLoading?patientData.map(patient=><RowCreator item={patient}/>):""}

                </tbody>
            </table>
            <br/>
            <Link  to={'/addPatient'}><font size="5">Register Patient</font></Link>
        </div>)
}

function RowCreator(props){
  
        var patient = props.item;
        return <tr>
            <td>{patient.id}</td>
            <td>{patient.first_name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.age}</td>
            <td><Link to={'/patientDetails/'+patient.id}>Add Data</Link></td>
            <td><Link to={'/analyze/'+patient.id}>Analyze</Link></td>
        </tr>
    
}

export default Home;