import './App.css';
import EditDocs from './components/EditDocs';
import { Routes, Route } from "react-router-dom";
import Docs from './components/Docs';
import {app,database} from './firebaseConfig';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Docs database={database} />} />
      <Route path="/editDocs/:id" element={<EditDocs database={database}/>} />
    </Routes>
  );
}

export default App;
