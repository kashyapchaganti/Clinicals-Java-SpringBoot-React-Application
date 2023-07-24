import React from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';



function AnalyzeData(){
    const [data,setData] = useState([])
    const {patientId} = useParams()
    const [isLoading,setLoading]=useState(true)


   
    useEffect(()=>{
        axios.get("http://localhost:8080/clinicalservices/api/patients/analyze/"+patientId).then(res=>{
            setData(res.data)
            setLoading(false)
        })
    },[]);

  
        return (<div>
              <h2>Patient Details:</h2>
                First Name: {data.firstName}<br/>
                Last Name: {data.lastName}<br/>
                Age: {data.age}
              
            <h2>Clinical Report:</h2>
                    {!isLoading?data.clinicalData.map(eachEntry=><RowCreator item={eachEntry} 
                    />):""}
            
            <Link to={'/'}>Go Back</Link>

        </div>)
    
}

function RowCreator(props){
        var eachEntry = props.item;
       
        return<div>
            <table align="center">
            <tr>
                <td><b>{eachEntry.componentName}</b></td>
            </tr>
            <tr>
            <td>{eachEntry.componentName}</td>
            <td>{eachEntry.componentValue}</td>
            <td>{eachEntry.measuredDateTime}</td>

        </tr>
        </table>
        </div>
    }




export default AnalyzeData;