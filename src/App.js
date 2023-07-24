import './App.css';
import {Route,Routes} from 'react-router-dom';
import CollectClinicals from './components/CollectClinicals';
import AddPatient from './components/AddPatient';
import AnalyzeData from './components/AnalyzeData';
import Home from './components/Home';
// import {toast,ToastContainer } from 'react-toastify';


function App()  {

    return (
      <div className="App">
       
       <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/patientDetails/:patientId" element={<CollectClinicals/>}/>
        <Route  path="/addPatient" element={<AddPatient/>}/>
        <Route  path="/analyze/:patientId" element={<AnalyzeData/>}/>
        </Routes>
      </div>
    );
  }

export default App;
